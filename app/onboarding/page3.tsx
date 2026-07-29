import { PrimaryButton } from "@/components/PrimaryButton";
import { images } from "@/constants/images";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ImageSourcePropType, Text, View } from "react-native";

type Avatar = {
  image: ImageSourcePropType;
  left: number;
  top: number;
  size: number;
  bg: "white" | "black";
  photo: { left: number; top: number; width: number; height: number };
};

const AVATARS: Avatar[] = [
  {
    image: images.onboardingAvatar120,
    left: 52,
    top: 546,
    size: 51,
    bg: "black",
    photo: { left: -7, top: 2, width: 60, height: 55 },
  },
  {
    image: images.onboardingAvatar119,
    left: 157,
    top: 531,
    size: 80,
    bg: "white",
    photo: { left: -18, top: -2, width: 107, height: 86 },
  },
  {
    image: images.onboardingAvatar121,
    left: 291,
    top: 546,
    size: 51,
    bg: "black",
    photo: { left: -6, top: -2, width: 59, height: 69 },
  },
];

function AvatarBubble({ avatar }: { avatar: Avatar }) {
  return (
    <View
      style={{
        position: "absolute",
        left: avatar.left,
        top: avatar.top,
        width: avatar.size,
        height: avatar.size,
        borderRadius: 9999,
        borderWidth: 2,
        borderColor: "#E04242",
        backgroundColor: avatar.bg === "black" ? "#000000" : "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <Image
        source={avatar.image}
        style={{
          position: "absolute",
          left: avatar.photo.left,
          top: avatar.photo.top,
          width: avatar.photo.width,
          height: avatar.photo.height,
        }}
        contentFit="cover"
      />
    </View>
  );
}

/** Figma "Onboarding Page 3" (node 110:786). */
export default function OnboardingPage3Screen() {
  return (
    <View className="flex-1 bg-black">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <Image
        source={images.onboardingGlow3}
        style={{ position: "absolute", left: 0, top: 0, width: 393, height: 852 }}
        contentFit="cover"
      />

      <Image
        source={images.onboardingQuoteBubble3}
        style={{ position: "absolute", left: 25, top: 275, width: 343, height: 219 }}
        contentFit="fill"
      />

      <Image
        source={images.onboardingQuoteMark3}
        style={{ position: "absolute", left: 41, top: 299, width: 22, height: 19.25 }}
        contentFit="contain"
      />

      <Image
        source={images.onboardingQuoteMark3}
        style={{
          position: "absolute",
          left: 322,
          top: 415,
          width: 22.02,
          height: 19.28,
          transform: [{ rotate: "-179.93deg" }],
        }}
        contentFit="contain"
      />

      <Text
        style={{ position: "absolute", left: 59, top: 325, width: 276 }}
        className="text-center font-li-ador-regular text-[22px] leading-[33.66px] text-white"
      >
        {"প্রতিদিন "}
        <Text className="font-li-ador-semibold text-primary">৫০০ পৃষ্ঠা</Text>
        {" পড়ুন। জ্ঞানও চক্রবৃদ্ধি সুদের মতো, প্রতিদিন একটু একটু করে বেড়ে ওঠে।"}
      </Text>

      {AVATARS.map((avatar, index) => (
        <AvatarBubble key={index} avatar={avatar} />
      ))}

      <Text
        style={{ position: "absolute", left: 139, top: 617, width: 115 }}
        className="text-center font-aeonik-medium text-[16px] leading-[24.48px] text-white"
      >
        Warren Buffett
      </Text>

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
        onPress={() => router.push("/onboarding/page4")}
      >
        এগিয়ে যান
      </PrimaryButton>
    </View>
  );
}
