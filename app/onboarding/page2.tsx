import { PrimaryButton } from "@/components/PrimaryButton";
import { images } from "@/constants/images";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ImageSourcePropType, Text, View } from "react-native";

type AvatarPhoto = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type AvatarFrame = AvatarPhoto & { rotateDeg: number };

type AvatarSpec = {
  image: ImageSourcePropType;
  left: number;
  top: number;
  size: number;
  bg: "white" | "black";
  photo: AvatarPhoto;
  /** Present only for avatars whose crop box is rotated before being clipped by the circle. */
  frame?: AvatarFrame;
};

// Tune this single number to resize every avatar + the "+more!" badge
// together. 1 = exact Figma size; lower it (e.g. 0.9) to shrink them,
// raise it (e.g. 1.05) to grow them. Each one scales in place around its
// own center, so the collage arrangement below is unaffected.
const AVATAR_SCALE = 0.95;

// Tune this to move every avatar + the "+more!" badge up/down together,
// to rebalance the gap above (after the subheadline) vs. below (before the
// primary button). Negative moves everything up; 0 = exact Figma position.
const AVATAR_OFFSET_Y = -20;

function scaleAvatar(spec: AvatarSpec, scale: number): AvatarSpec {
  const size = spec.size * scale;
  const centerX = spec.left + spec.size / 2;
  const centerY = spec.top + spec.size / 2;

  return {
    ...spec,
    left: centerX - size / 2,
    top: centerY - size / 2,
    size,
    photo: {
      left: spec.photo.left * scale,
      top: spec.photo.top * scale,
      width: spec.photo.width * scale,
      height: spec.photo.height * scale,
    },
    frame: spec.frame && {
      ...spec.frame,
      left: spec.frame.left * scale,
      top: spec.frame.top * scale,
      width: spec.frame.width * scale,
      height: spec.frame.height * scale,
    },
  };
}

// Each avatar reproduces Figma's nested crop transform (an oversized photo
// pinned inside a circular frame) as absolute left/top/width/height, derived
// from the design's percentage-based image fills. Positions match the
// "Group 742" (node 6384:676) arrangement in Figma.
const FIGMA_AVATARS: AvatarSpec[] = [
  {
    image: images.onboardingAvatar100,
    left: 129,
    top: 440,
    size: 80,
    bg: "white",
    photo: { left: -21, top: -2, width: 123, height: 123 },
  },
  {
    image: images.onboardingAvatar112,
    left: -18,
    top: 451,
    size: 80,
    bg: "white",
    photo: { left: 6, top: -2, width: 72, height: 101 },
  },
  {
    image: images.onboardingAvatar103,
    left: 63,
    top: 558,
    size: 88,
    bg: "white",
    photo: { left: -31.86, top: -2, width: 125.02, height: 167.15 },
  },
  {
    image: images.onboardingAvatar110,
    left: 323,
    top: 586,
    size: 80,
    bg: "white",
    photo: { left: -37.33, top: -2, width: 160.15, height: 90 },
  },
  {
    image: images.onboardingAvatar101,
    left: 276,
    top: 451,
    size: 80,
    bg: "white",
    frame: { left: -21.36, top: -9.59, width: 106.03, height: 109.98, rotateDeg: -6.21 },
    photo: { left: -22.46, top: -34.91, width: 133.83, height: 200.85 },
  },
  {
    image: images.onboardingAvatar109,
    left: 168,
    top: 315,
    size: 80,
    bg: "white",
    photo: { left: -20, top: -2, width: 116, height: 116 },
  },
  {
    image: images.onboardingAvatar111,
    left: 39,
    top: 343,
    size: 60,
    bg: "white",
    photo: { left: -49.8, top: -17.54, width: 143.36, height: 215.12 },
  },
  {
    image: images.onboardingAvatar102,
    left: 323,
    top: 327,
    size: 80,
    bg: "black",
    frame: { left: -12, top: -2.14, width: 85.83, height: 88.6, rotateDeg: -5.43 },
    photo: { left: -18.04, top: 0, width: 117.75, height: 176.51 },
  },
];

const AVATARS: AvatarSpec[] = FIGMA_AVATARS.map((spec) => {
  const scaled = scaleAvatar(spec, AVATAR_SCALE);
  return { ...scaled, top: scaled.top + AVATAR_OFFSET_Y };
});

// "+more!" badge, scaled + shifted in place by the same constants as the avatars.
const MORE_BADGE_BOX = { left: 202, top: 542, width: 85, height: 84 };
const MORE_BADGE_WIDTH = MORE_BADGE_BOX.width * AVATAR_SCALE;
const MORE_BADGE_HEIGHT = MORE_BADGE_BOX.height * AVATAR_SCALE;
const MORE_BADGE = {
  left: MORE_BADGE_BOX.left + MORE_BADGE_BOX.width / 2 - MORE_BADGE_WIDTH / 2,
  top: MORE_BADGE_BOX.top + MORE_BADGE_BOX.height / 2 - MORE_BADGE_HEIGHT / 2 + AVATAR_OFFSET_Y,
  width: MORE_BADGE_WIDTH,
  height: MORE_BADGE_HEIGHT,
};

function AvatarBubble({ spec }: { spec: AvatarSpec }) {
  const photo = (
    <Image
      source={spec.image}
      style={{
        position: "absolute",
        left: spec.photo.left,
        top: spec.photo.top,
        width: spec.photo.width,
        height: spec.photo.height,
      }}
      contentFit="cover"
    />
  );

  return (
    <View
      style={{
        position: "absolute",
        left: spec.left,
        top: spec.top,
        width: spec.size,
        height: spec.size,
        borderRadius: 9999,
        borderWidth: 2,
        borderColor: "#E04242",
        backgroundColor: spec.bg === "black" ? "#000000" : "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {spec.frame ? (
        <View
          style={{
            position: "absolute",
            left: spec.frame.left,
            top: spec.frame.top,
            width: spec.frame.width,
            height: spec.frame.height,
            overflow: "hidden",
            transform: [{ rotate: `${spec.frame.rotateDeg}deg` }],
          }}
        >
          {photo}
        </View>
      ) : (
        photo
      )}
    </View>
  );
}

/** Figma "Onboarding Page 7" (node 108:314). */
export default function OnboardingPage2Screen() {
  return (
    <View className="flex-1 bg-black">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <Image
        source={images.onboardingGlow2}
        style={{ position: "absolute", left: 0, top: 0, width: 393, height: 852 }}
        contentFit="cover"
      />

      <Text
        style={{ position: "absolute", left: 46, top: 102, width: 309 }}
        className="text-center font-li-ador-regular text-[36px] leading-[45.36px] text-white"
      >
        বিশ্বসেরা পডকাস্ট, সংক্ষেপে
      </Text>

      <Text
        style={{ position: "absolute", left: 60, top: 213, width: 274 }}
        className="text-center font-kalpurush text-[16px] leading-[22.56px] text-[#F2F2F2]"
      >
        দীর্ঘ পডকাস্ট নয়, গুরুত্বপূর্ণ ইনসাইটগুলো জানুন মাত্র ১৫ মিনিটের অডিও সামারিতে
      </Text>

      {AVATARS.map((spec, index) => (
        <AvatarBubble key={index} spec={spec} />
      ))}

      <View
        style={{
          position: "absolute",
          left: MORE_BADGE.left,
          top: MORE_BADGE.top,
          width: MORE_BADGE.width,
          height: MORE_BADGE.height,
          borderRadius: 9999,
          backgroundColor: "#E04242",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{ fontSize: 16 * AVATAR_SCALE, lineHeight: 19.2 * AVATAR_SCALE }}
          className="font-aeonik-medium text-white"
        >
          + more!
        </Text>
      </View>

      {/* Bottom CTA kept at the same position as onboarding page 1 (raised
          above Figma's own lower placement) per product direction. */}
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
        onPress={() => router.push("/onboarding/page3")}
      >
        এগিয়ে যান
      </PrimaryButton>
    </View>
  );
}
