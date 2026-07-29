import { PrimaryButton } from "@/components/PrimaryButton";
import { images } from "@/constants/images";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ImageSourcePropType, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const COVER_SLOT_SIZE = { width: 89.911, height: 124.573 };
const COVER_CARD_SIZE = { width: 82.104, height: 119.706 };

// Original Figma spacing between consecutive covers in a row (left-value pitch).
const ROW_TILE_WIDTH = 519.36;
const ROW_HEIGHT = 160;
const SCREEN_WIDTH = 393;

type BookCoverOffset = {
  image: ImageSourcePropType;
  left: number;
  top: number;
};

// left here is relative to one row's own tile, not the screen. top is uniform
// per row so covers stay on one flat line while scrolling (a per-slot stagger
// reads fine on a static collage, but on a moving strip it looks like a
// step/gap every time a new cover slides into that slot).
const topRowCovers: BookCoverOffset[] = [
  { image: images.onboardingBook1, left: 0, top: 0 },
  { image: images.onboardingBook2, left: 103.87, top: 0 },
  { image: images.onboardingBook3, left: 207.75, top: 0 },
  { image: images.onboardingBook4, left: 311.62, top: 0 },
  { image: images.onboardingBook5, left: 415.49, top: 0 },
];

const bottomRowCovers: BookCoverOffset[] = [
  { image: images.onboardingBook6, left: 0, top: 0 },
  { image: images.onboardingBook7, left: 103.87, top: 0 },
  { image: images.onboardingBook8, left: 207.74, top: 0 },
  { image: images.onboardingBook9, left: 311.62, top: 0 },
  { image: images.onboardingBook10, left: 415.49, top: 0 },
];

function BookCover({ cover, tileOffset }: { cover: BookCoverOffset; tileOffset: number }) {
  return (
    <View
      style={{
        position: "absolute",
        left: cover.left + tileOffset,
        top: cover.top,
        width: COVER_SLOT_SIZE.width,
        height: COVER_SLOT_SIZE.height,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: COVER_CARD_SIZE.width,
          height: COVER_CARD_SIZE.height,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "#bbbbbb",
          backgroundColor: "#ffffff",
          overflow: "hidden",
          transform: [{ rotate: "-3.58deg" }, { skewX: "0.23deg" }],
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.09,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Image
          source={cover.image}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
      </View>
    </View>
  );
}

type MarqueeRowProps = {
  covers: BookCoverOffset[];
  top: number;
  direction: "leftToRight" | "rightToLeft";
  duration?: number;
};

/**
 * Infinite seamless scroller: the same 5-cover tile is rendered twice back to
 * back, and the track slides by exactly one tile width before repeating — so
 * the loop reset lands on a pixel-identical frame and never looks blank/jumpy.
 */
function MarqueeRow({ covers, top, direction, duration = 20000 }: MarqueeRowProps) {
  const translateX = useSharedValue(0);

  useEffect(() => {
    const target = direction === "rightToLeft" ? -ROW_TILE_WIDTH : ROW_TILE_WIDTH;
    translateX.value = withRepeat(
      withTiming(target, { duration, easing: Easing.linear }),
      -1,
      false,
    );
  }, [direction, duration, translateX]);

  const trackStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const secondTileOffset = direction === "rightToLeft" ? ROW_TILE_WIDTH : -ROW_TILE_WIDTH;

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        top,
        width: SCREEN_WIDTH,
        height: ROW_HEIGHT,
        overflow: "hidden",
      }}
    >
      <Animated.View style={[{ position: "absolute", left: 0, top: 0 }, trackStyle]}>
        {covers.map((cover, index) => (
          <BookCover key={`a-${index}`} cover={cover} tileOffset={0} />
        ))}
        {covers.map((cover, index) => (
          <BookCover key={`b-${index}`} cover={cover} tileOffset={secondTileOffset} />
        ))}
      </Animated.View>
    </View>
  );
}

/** Figma "Onboarding Page 5" (node 107:219) — full-bleed, status bar overlaid in light mode. */
export default function OnboardingScreen() {
  return (
    <View className="flex-1 bg-black">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <Image
        source={images.onboardingGlow}
        style={{ position: "absolute", left: 0, top: 0, width: 393, height: 852 }}
        contentFit="cover"
      />

      <Text
        style={{ position: "absolute", left: 36, top: 115, width: 321 }}
        className="text-center font-li-ador-bold text-[40px] leading-12.5 text-white"
      >
        <Text className="font-li-ador-semibold">প্রতিদিন </Text>
        <Text className="text-primary">১৫ মিনিটে</Text>
        <Text className="font-li-ador-semibold">{"\n"}শিখুন নতুন কিছু</Text>
      </Text>

      <Text
        style={{ position: "absolute", left: 88, top: 253, width: 218 }}
        className="text-center font-kalpurush text-h5 text-[#DCDCDC]"
      >
        বিশ্বসেরা বই ও পডকাস্টের সংক্ষিপ্ত অডিও সামারি
      </Text>

      <MarqueeRow covers={topRowCovers} top={335.77} direction="leftToRight" />
      <MarqueeRow covers={bottomRowCovers} top={480.63} direction="rightToLeft" />

      <Text
        style={{ position: "absolute", left: 83, top: 758, width: 236 }}
        className="text-center font-kalpurush text-body text-white"
      >
        অলরেডি একাউন্ট আছে?{" "}
        <Text className="underline" onPress={() => router.push("/auth-sheet")}>
          লগিন করুন
        </Text>
      </Text>

      <PrimaryButton
        variant="primary"
        style={{ position: "absolute", left: 43, top: 687, width: 307 }}
        onPress={() => router.push("/onboarding/page2")}
      >
        এগিয়ে যান
      </PrimaryButton>
    </View>
  );
}
