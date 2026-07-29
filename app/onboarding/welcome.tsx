import { images } from "@/constants/images";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";

// Icon spins+scales in over the first 500ms; "Welcome to" and "শুনো FM"
// fade in right after, staggered — timings/easings lifted from the Figma
// keyframes (node 116:390's 2s "loop", played once here instead of looped).
const ICON_ANIM_DURATION = 500;
const WELCOME_TEXT_DELAY = 304;
const WELCOME_TEXT_DURATION = 500;
const APP_NAME_DELAY = 617;
const APP_NAME_DURATION = 500;
const HOLD_AFTER_ANIMATION = 650;
const REDIRECT_DELAY = APP_NAME_DELAY + APP_NAME_DURATION + HOLD_AFTER_ANIMATION;

/** Figma "App Open Page" (node 116:390) — shown after a successful sign-up
 * or login, right before landing on /home. Routed as /onboarding/welcome
 * since it's the final step of the onboarding experience, even though it
 * only runs post-auth (not part of the pre-auth onboarding carousel). */
export default function WelcomeScreen() {
  // Core React Native `Animated`, not Reanimated — Reanimated v4's worklets
  // require a custom dev build and silently no-op in Expo Go.
  const iconRotate = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(1)).current;
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const appNameOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(iconRotate, {
        toValue: 1,
        duration: ICON_ANIM_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(iconScale, {
        toValue: 2.8,
        duration: ICON_ANIM_DURATION,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(welcomeOpacity, {
        toValue: 1,
        duration: WELCOME_TEXT_DURATION,
        delay: WELCOME_TEXT_DELAY,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(appNameOpacity, {
        toValue: 1,
        duration: APP_NAME_DURATION,
        delay: APP_NAME_DELAY,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [iconRotate, iconScale, welcomeOpacity, appNameOpacity]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // No dismissAll() here — the screen that routed us to /welcome
      // (auth-sheet.tsx / sign-up.tsx) already cleared the auth/onboarding
      // stack before getting here, so /welcome is the only screen left.
      // Calling dismissAll() again has nothing left to pop, which is what
      // throws the dev-only "POP_TO_TOP not handled" warning.
      router.replace("/home");
    }, REDIRECT_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const iconRotateDeg = iconRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["-180deg", "0deg"],
  });

  return (
    <View className="flex-1 bg-black">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      {/* Three separately-exported glow layers (Figma didn't flatten this
          background into one image) — each is a transparent-background blur
          ellipse, sized/positioned to match its node's blur bleed exactly. */}
      <Image
        source={images.welcomeGlowTopLeft}
        style={{ position: "absolute", left: -188, top: -326, width: 809, height: 1396 }}
        contentFit="contain"
      />
      <Image
        source={images.welcomeGlowRight}
        style={{ position: "absolute", left: 218, top: 8, width: 739, height: 586 }}
        contentFit="contain"
      />
      <Image
        source={images.welcomeGlowBottomLeft}
        style={{ position: "absolute", left: -583, top: 226, width: 754, height: 588 }}
        contentFit="contain"
      />

      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 367,
          alignItems: "center",
          transform: [{ rotate: iconRotateDeg }, { scale: iconScale }],
        }}
      >
        {/* Same logo mark as the app-open splash (app/index.tsx) — reused at
            its high-res source instead of the low-res Figma icon export, so
            it stays crisp scaled up to 2.8x. */}
        <Image source={images.appOpenLogo} style={{ width: 25, height: 25 }} contentFit="contain" />
      </Animated.View>

      <Animated.View style={{ position: "absolute", left: 71, top: 421, width: 251, opacity: welcomeOpacity }}>
        <Text className="text-center font-li-ador-semibold-italic text-[48px] leading-[62.4px] text-white">
          Welcome to
        </Text>
      </Animated.View>

      <Animated.View style={{ position: "absolute", left: 71, top: 479, width: 251, opacity: appNameOpacity }}>
        <Text className="text-center font-li-ador-semibold text-[48px] leading-[62.4px] text-white">
          শুনো FM
        </Text>
      </Animated.View>
    </View>
  );
}
