import { BookCover } from "@/components/BookCover";
import { colors } from "@/constants/theme";
import { images } from "@/constants/images";
import { PlayerPoint, player } from "@/data/player";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Line, Path, Rect } from "react-native-svg";

const PLAYBACK_SPEEDS = [1, 1.25, 1.5, 2, 0.75] as const;

// The progress bar and key-point cards reach the same left/right edges as
// the back icon (x=12), instead of Figma's own 36px side margins.
const CONTENT_PADDING = 12;
// The progress bar itself sits a bit further in than the cards.
const PROGRESS_PADDING = CONTENT_PADDING + 10;

const CONTROL_BAR_WIDTH = 280;
const PREV_NEXT_SCALE = 1.35;

function BackArrowIcon() {
  return (
    <Svg width={17.5} height={14.833} viewBox="0 0 17.5 14.8333" fill="none">
      <Path
        d="M0.75 7.41667H16.75M7.41667 14.0833L0.75 7.41667L7.41667 0.75"
        stroke="#ffffff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * Figma's default state has no fill — only a white outline; the red fill
 * only appears once favorited. The viewBox has a small margin added around
 * the path's natural bounds (which was sized assuming a fill, not a stroke)
 * so the outline's stroke width doesn't get clipped at the edges.
 */
function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <Svg width={21} height={19.867} viewBox="-1 -1 21 19.8673" fill="none">
      <Path
        d="M17.5744 1.98594C17.0544 1.36297 16.4013 0.861941 15.6622 0.518962C14.9231 0.175983 14.1164 -0.000413842 13.3002 0.00247968C11.9036 -0.0393911 10.5439 0.450324 9.50088 1.37087C8.45785 0.450324 7.09817 -0.0393911 5.70157 0.00247968C4.88534 -0.000413842 4.07861 0.175983 3.33952 0.518962C2.60042 0.861941 1.94735 1.36297 1.42736 1.98594C0.522171 3.07313 -0.424806 5.04154 0.203029 8.2495C1.2051 13.3723 8.71917 17.5762 9.03642 17.7483C9.17783 17.8264 9.33706 17.8673 9.49898 17.8673C9.6609 17.8673 9.82013 17.8264 9.96155 17.7483C10.2807 17.5724 17.7948 13.3685 18.7949 8.2495C19.4266 5.04154 18.4796 3.07313 17.5744 1.98594Z"
        fill={filled ? colors.primary : "none"}
        stroke={filled ? "none" : "#ffffff"}
        strokeWidth={filled ? 0 : 1.3}
      />
    </Svg>
  );
}

function CloudDownloadIcon() {
  return (
    <Svg width={20.25} height={19.5} viewBox="0 0 20.25 19.5" fill="none">
      <Path
        d="M3.09988 13.75C1.67697 12.7791 0.75 11.1922 0.75 9.39929C0.75 6.95008 2.625 4.6875 5.4375 4.25C6.31973 2.23637 8.4077 0.75 10.843 0.75C13.9625 0.75 16.5122 3.07251 16.6875 6C18.343 6.69488 19.5 8.40031 19.5 10.2469C19.5 11.8082 18.6729 13.1839 17.4167 13.9917M10.125 18.75V8.75M13.25 15.75L10.125 18.75L7 15.75"
        stroke="#ffffff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function PreviousIcon({ scale = 1 }: { scale?: number }) {
  return (
    <Svg width={20 * scale} height={12 * scale} viewBox="0 0 20 12" fill="none">
      <Path
        d="M0.90903 4.63285e-05C1.41109 4.63285e-05 1.81812 0.244263 1.81812 0.545497V4.68321L9.35715 0.159791C9.61715 0.00379175 10.0082 -0.0428988 10.3479 0.041537C10.6876 0.125973 10.9091 0.32488 10.9091 0.545461V4.68318L18.4481 0.159791C18.7081 0.00379175 19.0992 -0.0428988 19.4388 0.041537C19.7785 0.125973 20 0.32488 20 0.545461V11.4545C20 11.6751 19.7785 11.874 19.4388 11.9584C19.3264 11.9864 19.2082 12 19.0912 12C18.8545 12 18.622 11.9445 18.4481 11.8402L10.9091 7.31687V11.4545C10.9091 11.6751 10.6876 11.874 10.3479 11.9584C10.2355 11.9864 10.1173 12 10.0002 12C9.76364 12 9.53109 11.9446 9.35721 11.8402L1.81818 7.31691V11.4545C1.81818 11.7558 1.41115 12 0.909091 12C0.40703 12 6.76722e-09 11.7558 6.76722e-09 11.4545V0.545533C-6.05993e-05 0.244226 0.40697 4.63285e-05 0.90903 4.63285e-05Z"
        fill="#ffffff"
      />
    </Svg>
  );
}

function NextIcon({ scale = 1 }: { scale?: number }) {
  return (
    <Svg width={20 * scale} height={12 * scale} viewBox="0 0 20 12" fill="none">
      <Path
        d="M19.091 4.63285e-05C18.5889 4.63285e-05 18.1819 0.244263 18.1819 0.545497V4.68321L10.6428 0.159791C10.3828 0.00379175 9.99176 -0.0428988 9.65212 0.041537C9.31242 0.125973 9.09091 0.32488 9.09091 0.545461V4.68318L1.55194 0.159791C1.29194 0.00379175 0.900848 -0.0428988 0.561212 0.041537C0.221515 0.125973 0 0.32488 0 0.545461V11.4545C0 11.6751 0.221455 11.874 0.561212 11.9584C0.673636 11.9864 0.791818 12 0.908848 12C1.14545 12 1.378 11.9445 1.55188 11.8402L9.09091 7.31687V11.4545C9.09091 11.6751 9.31236 11.874 9.65212 11.9584C9.76455 11.9864 9.88273 12 9.99976 12C10.2364 12 10.4689 11.9446 10.6428 11.8402L18.1818 7.31691V11.4545C18.1818 11.7558 18.5888 12 19.0909 12C19.593 12 20 11.7558 20 11.4545V0.545533C20.0001 0.244226 19.593 4.63285e-05 19.091 4.63285e-05Z"
        fill="#ffffff"
      />
    </Svg>
  );
}

function PlayTriangleIcon({ size = 20 }: { size?: number }) {
  const height = size * (23.334 / 19.833);
  return (
    <Svg width={size} height={height} viewBox="0 0 19.833 23.334" fill="none">
      <Path
        d="M0.976562 0C1.18801 5.20248e-05 1.38312 0.0679011 1.54297 0.181641L1.5459 0.180664L19.293 10.7969C19.6132 10.9564 19.833 11.2853 19.833 11.666C19.833 12.0432 19.6171 12.3691 19.3018 12.5303L1.5459 23.1523L1.54395 23.1514C1.38393 23.2655 1.18843 23.3339 0.976562 23.334C0.437178 23.334 0 22.8983 0 22.3613V11.667H17.8799V11.666H0V0.972656C0 0.435713 0.437178 0 0.976562 0Z"
        fill="#ffffff"
      />
    </Svg>
  );
}

function PauseBarsIcon({
  width = 6.3,
  height = 10,
  strokeWidth = 1.3,
}: {
  width?: number;
  height?: number;
  strokeWidth?: number;
}) {
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <Line
        x1={width - 0.65}
        y1={height * 0.065}
        x2={width - 0.65}
        y2={height * 0.935}
        stroke="#ffffff"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Line
        x1={0.65}
        y1={height * 0.065}
        x2={0.65}
        y2={height * 0.935}
        stroke="#ffffff"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** Figma's "Progress" graphic (node 132:1545) — track, red fill, red thumb, drawn as one shape. */
function ProgressTrack({ progress, width }: { progress: number; width: number }) {
  const fillWidth = width * Math.min(1, Math.max(0, progress));
  return (
    <Svg width={width} height={8} viewBox={`0 0 ${width} 8`} fill="none">
      <Rect y={3} width={width} height={2} rx={1} fill="#C8C7CC" />
      <Rect y={3} width={fillWidth} height={2} rx={1} fill={colors.primary} />
      <Circle cx={fillWidth} cy={4} r={4} fill={colors.primary} />
    </Svg>
  );
}

const SKIP_BUTTON_SIZE = 30;

/**
 * MaterialIcons' "replay-5"/"forward-5" read as hard-edged and heavy at this
 * size; MaterialCommunityIcons' "rewind-5"/"fast-forward-5" are the same
 * idea (number baked into the glyph) but drawn with a softer, more rounded
 * line weight.
 */
function SkipButton({ direction, onPress }: { direction: "back" | "forward"; onPress: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      hitSlop={10}
      onPress={onPress}
      style={{ width: SKIP_BUTTON_SIZE, height: SKIP_BUTTON_SIZE, alignItems: "center", justifyContent: "center" }}
    >
      <MaterialCommunityIcons
        name={direction === "back" ? "rewind-5" : "fast-forward-5"}
        size={SKIP_BUTTON_SIZE}
        color="#ffffff"
      />
    </TouchableOpacity>
  );
}

const CARD_HEIGHT = 80;
const CARD_ICON_SIZE = 32;
const CARD_DURATION_WIDTH = 140;

function KeyPointCard({
  point,
  isPlaying,
  onPress,
}: {
  point: PlayerPoint;
  /** Whether THIS point is the active one and it's currently playing — shared with the main play button's own state. */
  isPlaying: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        height: CARD_HEIGHT,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#400202",
        backgroundColor: "#000000",
      }}
    >
      <Text
        numberOfLines={2}
        style={{ position: "absolute", left: 18, top: 16, right: CARD_ICON_SIZE + 32 }}
        className="font-li-ador-regular text-[15px] leading-[21px] text-white"
      >
        <Text style={{ color: colors.primary }}>{point.number}. </Text>
        {point.title}
      </Text>

      <View
        style={{
          position: "absolute",
          right: 16,
          top: 16,
          width: CARD_ICON_SIZE,
          height: CARD_ICON_SIZE,
          borderRadius: CARD_ICON_SIZE / 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#752525",
        }}
      >
        {isPlaying ? <PauseBarsIcon width={8.4} height={13.3} /> : <PlayTriangleIcon size={11.3} />}
      </View>

      {/* Right-aligned under the play/pause icon, with room to breathe above
          the card's bottom border instead of touching it. */}
      <Text
        style={{ position: "absolute", right: 16, top: 56, width: CARD_DURATION_WIDTH, textAlign: "right" }}
        className="font-kalpurush text-[11px] leading-[15px] text-[#afafaf]"
      >
        {point.durationLabel}
      </Text>
    </TouchableOpacity>
  );
}

/**
 * "Now Playing" page (Figma node 132:1498) — pushed from the book intro's
 * "Listen now" button.
 *
 * Built as normal flow layout (marginTop between siblings), not an
 * absolutely-positioned canvas: the point-title heading's height genuinely
 * varies (2-5 lines depending on which point is active), and a fixed-height
 * canvas can't reflow the content below it when that height changes — it
 * either clips long titles or needs its downstream coordinates patched by
 * hand every time. Flow layout lets React Native do that reflow for free,
 * matching every other screen in this app (book.tsx, author.tsx, etc.).
 *
 * Playback/queue state is local UI state only; no audio engine is wired up
 * yet (matches book.tsx's unwired PlayButton).
 */
export default function PlayerScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);

  const activePoint = player.points[activeIndex];
  const speed = PLAYBACK_SPEEDS[speedIndex];

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        <View>
          {/* Top-left corner glow — reuses explore.tsx's exact asset, box
              size, and anchor (0, 0) with contentFit="contain" rather than a
              player-specific export, since that's the reference the design
              is meant to match here. */}
          <View pointerEvents="none" style={{ position: "absolute", left: 0, top: 0, width: 350, height: 233 }}>
            <Image source={images.exploreGlow} style={{ width: "100%", height: "100%" }} contentFit="contain" />
          </View>

          <View style={{ paddingTop: insets.top + 16, paddingHorizontal: CONTENT_PADDING }}>
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={8}
              onPress={() => router.back()}
              style={{ width: 32, height: 32, alignItems: "center", justifyContent: "center" }}
            >
              <BackArrowIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Trimmed from Figma's 54px gap so the progress bar/controls land on
            screen without a manual scroll on first load — keeps some
            breathing room below the back button, just not the full gap. */}
        <View style={{ marginTop: 16, alignItems: "center" }}>
          <BookCover source={player.cover} width={198} height={295} radius={8} />

          <Text
            style={{ marginTop: 19, textAlign: "center" }}
            className="font-li-ador-regular text-[20px] leading-[26px] text-white"
          >
            {player.title}
          </Text>

          <Text
            style={{ marginTop: 28, textAlign: "center" }}
            className="font-kalpurush text-[15px] leading-[22px] text-[#a5a5a5]"
          >
            {`অধ্যায় ${activePoint.number} / ${player.totalPointsLabel}`}
          </Text>

          {/* No numberOfLines cap and no fixed height — a longer point title
              wraps to as many lines as it needs, and everything below
              reflows automatically instead of overlapping it. */}
          <Text
            style={{ marginTop: 15, width: 300, textAlign: "center" }}
            className="font-li-ador-light text-[20px] leading-[32px] text-white"
          >
            {activePoint.title}
          </Text>
        </View>

        {/* Row instead of two independently-offset icons, so the download
            and heart icons line up on the same visual center regardless of
            their differing natural heights. Right padding is bigger than
            the cards' so the heart icon isn't flush against the edge. */}
        <View
          style={{
            marginTop: 23,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 16,
            paddingRight: 24,
          }}
        >
          <TouchableOpacity activeOpacity={0.7} hitSlop={8}>
            <CloudDownloadIcon />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} hitSlop={8} onPress={() => setIsFavorited((prev) => !prev)}>
            <HeartIcon filled={isFavorited} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 19, paddingHorizontal: PROGRESS_PADDING }}>
          <ProgressTrackRow progress={player.progress} />
        </View>

        <View
          style={{
            marginTop: 13,
            width: CONTROL_BAR_WIDTH,
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity activeOpacity={0.7} hitSlop={10}>
            <PreviousIcon scale={PREV_NEXT_SCALE} />
          </TouchableOpacity>
          <SkipButton direction="back" onPress={() => {}} />
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setIsPlaying((prev) => !prev)}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.primary,
            }}
          >
            {isPlaying ? <PauseBarsIcon width={16} height={25} strokeWidth={2.2} /> : <PlayTriangleIcon size={20} />}
          </TouchableOpacity>
          <SkipButton direction="forward" onPress={() => {}} />
          <TouchableOpacity activeOpacity={0.7} hitSlop={10}>
            <NextIcon scale={PREV_NEXT_SCALE} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setSpeedIndex((prev) => (prev + 1) % PLAYBACK_SPEEDS.length)}
          style={{ marginTop: 2, marginLeft: 24, alignSelf: "flex-start" }}
        >
          <Text className="font-aeonik-medium text-[14px] leading-[21px] text-white">{speed.toFixed(2)}x</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 56, paddingHorizontal: CONTENT_PADDING }}>
          {/* Same ambient glow as the header, positioned behind the card
              stack. Anchored to this section's own bottom edge (not a
              global y-coordinate), so it stays put regardless of how tall
              the heading above pushed everything else down. */}
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              left: "50%",
              bottom: -60,
              width: 467,
              height: 229,
              transform: [{ translateX: -257.5 }],
            }}
          >
            <Image source={images.playerGlow} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          </View>

          <View style={{ gap: 14 }}>
            {player.points.map((point, index) => (
              <KeyPointCard
                key={point.number}
                point={point}
                isPlaying={index === activeIndex && isPlaying}
                onPress={() => {
                  // Tapping the already-active card behaves exactly like the
                  // main play/pause button — they share one isPlaying state.
                  // Tapping a different card switches to it and starts it.
                  if (index === activeIndex) {
                    setIsPlaying((prev) => !prev);
                  } else {
                    setActiveIndex(index);
                    setIsPlaying(true);
                  }
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function ProgressTrackRow({ progress }: { progress: number }) {
  const [trackWidth, setTrackWidth] = useState(0);
  return (
    <View>
      <View onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}>
        {trackWidth > 0 && <ProgressTrack progress={progress} width={trackWidth} />}
      </View>
      <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
        <Text className="font-aeonik-regular text-[13px] leading-[18px] text-white">{player.positionLabel}</Text>
        <Text className="font-aeonik-regular text-[13px] leading-[18px] text-white">{player.remainingLabel}</Text>
      </View>
    </View>
  );
}
