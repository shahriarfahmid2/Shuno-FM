import { images } from "@/constants/images";
import { useAuth } from "@clerk/expo";
import { Image } from "expo-image";
import { Href, router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";

const BASE_DELAY = 300;
const STAGGER = 150;
const FADE_DURATION = 350;

// Time to hold the fully-visible splash before redirecting, so the redirect
// can never fire mid-fade. Derived from the animation's own timeline rather
// than a standalone number, so it stays in sync if the timings above change.
const ANIMATION_END = BASE_DELAY + STAGGER * 2 + FADE_DURATION;
const HOLD_AFTER_ANIMATION = 550;
const REDIRECT_DELAY = ANIMATION_END + HOLD_AFTER_ANIMATION;

/** Figma "App Open Page" (node 6390:701) — app entry point, redirects to
 * "/home" if a Clerk session already exists, otherwise "/onboarding". */
export default function AppOpenScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const [animationDone, setAnimationDone] = useState(false);
  // Core React Native `Animated`, not Reanimated — Reanimated v4's worklets
  // require a custom dev build and silently no-op in Expo Go, so this screen
  // uses the API that ships with React Native itself instead.
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const headlineOpacity = useRef(new Animated.Value(0)).current;
  const subheadlineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: FADE_DURATION,
        delay: BASE_DELAY,
        useNativeDriver: true,
      }),
      Animated.timing(headlineOpacity, {
        toValue: 1,
        duration: FADE_DURATION,
        delay: BASE_DELAY + STAGGER,
        useNativeDriver: true,
      }),
      Animated.timing(subheadlineOpacity, {
        toValue: 1,
        duration: FADE_DURATION,
        delay: BASE_DELAY + STAGGER * 2,
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoOpacity, headlineOpacity, subheadlineOpacity]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationDone(true), REDIRECT_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!animationDone || !isLoaded) {
      return;
    }

    if (isSignedIn) {
      router.replace("/home");
    } else {
      // Cast needed because expo-router's typed routes generator has a
      // Windows path-separator bug: it types this nested index route as
      // "/onboarding/index" instead of collapsing it to "/onboarding". The
      // collapsed form ("/onboarding") is the one that's actually navigable
      // at runtime (verified against expo-router's route matcher).
      router.replace("/onboarding" as Href);
    }
  }, [animationDone, isLoaded, isSignedIn]);

  return (
    <View className="flex-1 bg-black">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      {/* Single pre-flattened background (all glow layers merged in Figma
          itself), filling the real container edge-to-edge — no seams,
          regardless of device size. */}
      <Image
        source={images.appOpenGlow}
        style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
        contentFit="cover"
      />

      {/* Logo, then headline, then subheadline — each fades in after the
          black hold, staggered so they appear one after another. */}
      <Animated.View
        style={{
          position: "absolute",
          left: 147,
          top: 330,
          width: 96,
          height: 96,
          opacity: logoOpacity,
        }}
      >
        <Image source={images.appOpenLogo} style={{ width: 96, height: 96 }} contentFit="contain" />
      </Animated.View>

      <Animated.View
        style={{ position: "absolute", left: 71, top: 433, width: 251, opacity: headlineOpacity }}
      >
        <Text className="text-center font-li-ador-semibold text-[48px] leading-[62.4px] text-white">
          শুনো FM
        </Text>
      </Animated.View>

      <Animated.View
        style={{ position: "absolute", left: 71, top: 498, width: 251, opacity: subheadlineOpacity }}
      >
        <Text className="text-center font-kalpurush text-[16px] leading-[20.8px] text-white">
          শুনুন যখন যেখানে খুশি
        </Text>
      </Animated.View>
    </View>
  );
}
