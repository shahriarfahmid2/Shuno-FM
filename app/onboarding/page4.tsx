import { PrimaryButton } from "@/components/PrimaryButton";
import { images } from "@/constants/images";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

/** Figma "Onboarding Page 4 (Final)" (node 108:565). */
export default function OnboardingPage4Screen() {
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
        source={images.onboardingIcon4}
        style={{ position: "absolute", left: 179, top: 111, width: 35, height: 35 }}
        contentFit="contain"
      />

      <Text
        style={{ position: "absolute", left: 60, top: 163, width: 274 }}
        className="text-center font-li-ador-regular text-[28px] leading-[35.28px] text-white"
      >
        আপনার প্রথম অডিওবুকটি আর মাত্র কয়েক সেকেন্ড দূরে আছে
      </Text>

      <Text
        style={{ position: "absolute", left: 49, top: 285, width: 309 }}
        className="text-center font-kalpurush text-[16px] leading-[25.38px] text-[#ACACAC]"
      >
        দ্রুত জয়েন করুন
      </Text>

      {/* Figma crops this square photo to a shorter box (clips the bottom)
          and rotates the crop box slightly — reproduced here since the HD
          source is the original uncropped upload, not a pre-cropped export. */}
      <View
        style={{
          position: "absolute",
          left: -5.8,
          top: 306.4,
          width: 384.6,
          height: 350.7,
          overflow: "hidden",
          transform: [{ rotate: "-3.57deg" }],
        }}
      >
        <Image
          source={images.onboardingHeroPhoto4}
          style={{ position: "absolute", left: 0, top: 0, width: 384.6, height: 384.6 }}
          contentFit="cover"
        />
      </View>

      <Image
        source={images.onboardingGlow4Mid}
        style={{ position: "absolute", left: 0, top: 495, width: 393, height: 318 }}
        contentFit="cover"
      />

      {/* Bottom CTA kept at the same position as the other onboarding pages. */}
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
        onPress={() => router.push("/sign-up")}
      >
        এগিয়ে যান
      </PrimaryButton>
    </View>
  );
}
