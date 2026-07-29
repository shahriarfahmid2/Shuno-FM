import { BookCover } from "@/components/BookCover";
import { FeaturedBook } from "@/data/home";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, PanResponder, Pressable, StyleSheet, Text, View } from "react-native";

// Horizontal distance between adjacent card centers, and the base card box
// every card renders at before its animated scale is applied (matches the
// Figma-derived center card size — side cards land at ~0.8x that, close
// enough to their own 127x191/125x188 sizes that the difference is invisible).
const PITCH = 161;
const CARD_WIDTH = 158;
const CARD_HEIGHT = 238;
const CARD_RADIUS = 8;
// Cards rendered on each side of the active one, so a cover is already
// mounted (transparent, off-screen) well before it needs to slide into view.
// Three rather than two purely as slack for interrupted transitions: a fast
// second swipe advances the index while the previous slide is mid-flight, and
// with only two the card unmounting off the trailing edge could still be
// on-screen at that moment. Everything past +/-2 pitches clamps to opacity 0,
// so the extra pair costs a mounted view and renders nothing.
const SIDE_SLOTS = 3;
const COMMIT_DURATION = 300;
const TEXT_FADE_DURATION = 240;
const DOT_DURATION = 200;

function mod(index: number, length: number) {
  return ((index % length) + length) % length;
}

const styles = StyleSheet.create({
  row: {
    height: CARD_HEIGHT,
    overflow: "hidden",
  },
  card: {
    position: "absolute",
    left: "50%",
    marginLeft: -CARD_WIDTH / 2,
    top: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_RADIUS,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
  },
  press: {
    width: "100%",
    height: "100%",
  },
});

function PaginationDot({ active }: { active: boolean }) {
  const progress = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: active ? 1 : 0,
      duration: DOT_DURATION,
      useNativeDriver: false,
    }).start();
  }, [active, progress]);

  return (
    <Animated.View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: progress.interpolate({
          inputRange: [0, 1],
          outputRange: ["#696969", "#E04242"],
        }),
        transform: [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 1.15] }) }],
      }}
    />
  );
}

type CarouselCardProps = {
  book: FeaturedBook;
  absoluteIndex: number;
  dragX: Animated.Value;
  relativeSlot: number;
  onSelect: (absoluteIndex: number) => void;
};

/**
 * One cover in the carousel. Mounted under `key={absoluteIndex}` and shows
 * exactly one book for its entire lifetime, so its `<Image>` never needs a
 * new `source` — it only ever slides/scales to a new position.
 *
 * The JSX structure here is deliberately identical in every state (the
 * Pressable is always present, only `disabled` changes). Swapping the
 * element type per slot — e.g. wrapping in a Touchable only for side cards —
 * changes the element type at this position when a card changes slot, which
 * makes React unmount and remount the whole subtree including the image.
 * That remount is a visible re-decode flash on several cards at once.
 */
const CarouselCard = memo(function CarouselCard({
  book,
  absoluteIndex,
  dragX,
  relativeSlot,
  onSelect,
}: CarouselCardProps) {
  // Built exactly once per mounted card: `dragX` is a ref and `absoluteIndex`
  // is this card's identity, so both are constant for its whole lifetime.
  // Rebuilding these nodes on every render forces Animated to tear down and
  // re-attach the native node graph, which can leave a driven prop stranded
  // at its last value for a frame.
  const animatedStyle = useMemo(() => {
    const cardX = Animated.add(dragX, absoluteIndex * PITCH);
    const ramp = {
      inputRange: [-2 * PITCH, -PITCH, 0, PITCH, 2 * PITCH],
      extrapolate: "clamp" as const,
    };
    return {
      transform: [
        { translateX: cardX },
        { scale: cardX.interpolate({ ...ramp, outputRange: [0.6, 0.8, 1, 0.8, 0.6] }) },
      ],
      opacity: cardX.interpolate({ ...ramp, outputRange: [0, 1, 1, 1, 0] }),
      // Shadow fades with distance instead of switching on/off when the
      // index changes, so the hero's drop shadow has no discrete pop.
      shadowOpacity: cardX.interpolate({ ...ramp, outputRange: [0, 0, 0.5, 0, 0] }),
      elevation: cardX.interpolate({ ...ramp, outputRange: [0, 0, 10, 0, 0] }),
    };
  }, [dragX, absoluteIndex]);

  const isNeighbour = Math.abs(relativeSlot) === 1;

  return (
    <Animated.View style={[styles.card, { zIndex: 10 - Math.abs(relativeSlot) }, animatedStyle]}>
      <Pressable
        onPress={() => onSelect(absoluteIndex)}
        disabled={!isNeighbour}
        style={styles.press}
      >
        <BookCover source={book.cover} width={CARD_WIDTH} height={CARD_HEIGHT} radius={CARD_RADIUS} />
      </Pressable>
    </Animated.View>
  );
});

type FeaturedBookCarouselProps = {
  books: FeaturedBook[];
};

/**
 * Hero carousel (Figma "Thumbnails", node 101:1690) — a coverflow-style
 * window over an arbitrary-length book list (wraparound via `mod`), so it
 * loops seamlessly no matter how many books are passed in.
 *
 * `dragX` accumulates forever (0 → -161 → -322 → …) and is never reset; a
 * card's position is always `absoluteIndex * PITCH + dragX`. At rest, dragX
 * equals `-activeIndex * PITCH`, which is what puts the active card at 0.
 * Keeping one continuously-growing value means position is driven by exactly
 * one source — there is no second update path (a state commit, an imperative
 * reset) that has to land on the same frame to look right.
 */
export function FeaturedBookCarousel({ books }: FeaturedBookCarouselProps) {
  // Unbounded, so a mounted card's key never has to be reassigned to a
  // different book. Wrapped with `mod` only where a book is looked up.
  const [activeIndex, setActiveIndex] = useState(0);
  const dragX = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  // Mirrors activeIndex for the gesture handlers, which are created once and
  // would otherwise capture a stale value from the first render.
  const activeIndexRef = useRef(0);
  const dragBaseRef = useRef(0);

  const settleTo = useCallback(
    (index: number) => {
      Animated.timing(dragX, {
        toValue: -index * PITCH,
        duration: COMMIT_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    },
    [dragX],
  );

  const commit = useCallback(
    (direction: 1 | -1) => {
      const nextIndex = activeIndexRef.current + direction;
      activeIndexRef.current = nextIndex;
      // Hidden before the new title/author can paint, then faded back in by
      // the effect below once React has rendered them.
      textOpacity.setValue(0);
      // Committed now rather than in the animation's completion callback:
      // this only decides which cards are mounted and which book each shows,
      // never where they sit, so it can't desync from the slide.
      setActiveIndex(nextIndex);
      settleTo(nextIndex);
    },
    [settleTo, textOpacity],
  );

  useEffect(() => {
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: TEXT_FADE_DURATION,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [activeIndex, textOpacity]);

  const selectCard = useCallback(
    (absoluteIndex: number) => {
      const direction = absoluteIndex - activeIndexRef.current;
      if (direction === 1 || direction === -1) {
        commit(direction);
      }
    },
    [commit],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        // Capture variants too: each cover is a Pressable, which claims the
        // responder on touch-start — without these, a drag that begins on top
        // of a cover would never reach this handler.
        onMoveShouldSetPanResponderCapture: (_, gesture) =>
          Math.abs(gesture.dx) > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
        onMoveShouldSetPanResponder: (_, gesture) =>
          Math.abs(gesture.dx) > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
        onPanResponderGrant: () => {
          // Read live rather than from the last rest position, so grabbing
          // mid-slide (a fast second swipe) picks up where it actually is.
          dragX.stopAnimation((value) => {
            dragBaseRef.current = value;
          });
        },
        onPanResponderMove: (_, gesture) => {
          dragX.setValue(dragBaseRef.current + gesture.dx);
        },
        onPanResponderRelease: (_, gesture) => {
          const passedDistance = Math.abs(gesture.dx) > PITCH / 3;
          const passedVelocity = Math.abs(gesture.vx) > 0.4;
          if (passedDistance || passedVelocity) {
            const goingLeft = gesture.dx < 0 || (gesture.dx === 0 && gesture.vx < 0);
            commit(goingLeft ? 1 : -1);
          } else {
            settleTo(activeIndexRef.current);
          }
        },
        onPanResponderTerminate: () => settleTo(activeIndexRef.current),
      }),
    [commit, dragX, settleTo],
  );

  const count = books.length;
  if (count === 0) {
    return <View />;
  }

  const activeBook = books[mod(activeIndex, count)];
  const windowIndices = Array.from(
    { length: SIDE_SLOTS * 2 + 1 },
    (_, i) => activeIndex - SIDE_SLOTS + i,
  );

  return (
    <View>
      <View style={styles.row} {...panResponder.panHandlers}>
        {windowIndices.map((absoluteIndex) => (
          <CarouselCard
            key={absoluteIndex}
            book={books[mod(absoluteIndex, count)]}
            absoluteIndex={absoluteIndex}
            dragX={dragX}
            relativeSlot={absoluteIndex - activeIndex}
            onSelect={selectCard}
          />
        ))}
      </View>

      <Animated.View className="mt-4 px-8" style={{ opacity: textOpacity }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-center font-aeonik-bold text-[15px] leading-5 text-white"
        >
          {activeBook.title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="mt-1 text-center font-aeonik-regular text-[13px] leading-[18px] text-[#fcfcfc]"
        >
          {activeBook.author}
        </Text>
      </Animated.View>

      <View className="mt-3 flex-row items-center justify-center gap-1.5">
        {books.map((book, index) => (
          <PaginationDot key={book.id} active={index === mod(activeIndex, count)} />
        ))}
      </View>
    </View>
  );
}
