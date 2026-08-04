import { PrimaryButton } from "@/components/PrimaryButton";
import { SubscriptionInfoBox } from "@/components/SubscriptionInfoBox";
import { images } from "@/constants/images";
import { getExpiryDate } from "@/data/subscription";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CONFETTI_COLORS = ["#e04242", "#f0c674", "#59b87a", "#5b9bff", "#ffffff"];
const PARTICLES_PER_SIDE = 16;

type ConfettiShape = "strip" | "dot";

type ConfettiPiece = {
  id: number;
  side: "left" | "right";
  shape: ConfettiShape;
  color: string;
  size: number;
  length: number;
  originY: number;
  peakX: number;
  duration: number;
  delay: number;
  spinDeg: number;
  flutterDuration: number;
};

function buildConfettiPieces(screenWidth: number, screenHeight: number): ConfettiPiece[] {
  const pieces: ConfettiPiece[] = [];
  (["left", "right"] as const).forEach((side) => {
    for (let i = 0; i < PARTICLES_PER_SIDE; i += 1) {
      const isFirstWave = i < PARTICLES_PER_SIDE * 0.6;
      pieces.push({
        id: pieces.length,
        side,
        shape: Math.random() < 0.35 ? "dot" : "strip",
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 5 + Math.random() * 4,
        length: 9 + Math.random() * 7,
        originY: screenHeight * (0.3 + Math.random() * 0.3),
        peakX: side === "left" ? screenWidth * (0.2 + Math.random() * 0.5) : screenWidth * (0.3 + Math.random() * 0.5),
        duration: 1900 + Math.random() * 1100,
        delay: isFirstWave ? Math.random() * 120 : 120 + Math.random() * 380,
        spinDeg: (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 500),
        flutterDuration: 260 + Math.random() * 220,
      });
    }
  });
  return pieces;
}

/**
 * One confetti piece — pops into view, bursts up from a screen edge along
 * an arc, then falls with gravity past the bottom edge while tumbling
 * (a looping scaleY "flutter" fakes a paper strip flipping edge-on).
 */
function ConfettiParticle({ piece, screenWidth, screenHeight }: { piece: ConfettiPiece; screenWidth: number; screenHeight: number }) {
  const progress = useRef(new Animated.Value(0)).current;
  const flutter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const burst = Animated.timing(progress, {
      toValue: 1,
      duration: piece.duration,
      delay: piece.delay,
      easing: Easing.bezier(0.16, 0.84, 0.44, 1),
      useNativeDriver: true,
    });
    const flutterLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(flutter, {
          toValue: 1,
          duration: piece.flutterDuration,
          delay: piece.delay,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(flutter, {
          toValue: 0,
          duration: piece.flutterDuration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    burst.start();
    flutterLoop.start();
    return () => {
      burst.stop();
      flutterLoop.stop();
    };
  }, [flutter, piece.delay, piece.duration, piece.flutterDuration, progress]);

  const originX = piece.side === "left" ? -16 : screenWidth + 16;

  const translateX = progress.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [originX, piece.peakX, piece.peakX + (piece.side === "left" ? 26 : -26)],
  });
  const translateY = progress.interpolate({
    inputRange: [0, 0.16, 0.4, 1],
    outputRange: [piece.originY, piece.originY - 200, piece.originY - 110, screenHeight + 120],
  });
  const rotate = progress.interpolate({ inputRange: [0, 1], outputRange: ["0deg", `${piece.spinDeg}deg`] });
  const scale = progress.interpolate({ inputRange: [0, 0.08, 1], outputRange: [0.3, 1, 1] });
  const opacity = progress.interpolate({ inputRange: [0, 0.05, 0.88, 1], outputRange: [0, 1, 1, 0] });

  const flutterScaleY = flutter.interpolate({ inputRange: [0, 1], outputRange: [1, 0.2] });
  const flutterSway = flutter.interpolate({ inputRange: [0, 1], outputRange: [0, piece.side === "left" ? 9 : -9] });

  const isDot = piece.shape === "dot";

  return (
    <Animated.View
      style={{
        position: "absolute",
        width: piece.size,
        height: isDot ? piece.size : piece.length,
        borderRadius: isDot ? piece.size / 2 : 1.5,
        backgroundColor: piece.color,
        opacity,
        transform: [{ translateX }, { translateY }, { translateX: flutterSway }, { rotate }, { scale }, { scaleY: flutterScaleY }],
      }}
    />
  );
}

/** Fires once on mount — a confetti cannon blast from both screen edges
 * that arcs up and tumbles down past the bottom of the screen. */
function ConfettiBurst() {
  const { width, height } = useWindowDimensions();
  const pieces = useMemo(() => buildConfettiPieces(width, height), [width, height]);

  return (
    <View pointerEvents="none" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
      {pieces.map((piece) => (
        <ConfettiParticle key={piece.id} piece={piece} screenWidth={width} screenHeight={height} />
      ))}
    </View>
  );
}

/**
 * Figma "Subscription Active Page" (node 6612:7664) — lands here right
 * after the payment screen's simulated processing step. The static confetti
 * illustration from Figma was replaced with an animated confetti burst
 * (it was blurry at its exported size), a purchase summary box and a manual
 * "হোম পেজে ফিরে যান" button were added below the subheadline (no more
 * auto-redirect), and a success haptic fires on open — none of that is in
 * the Figma export, all added per request. Reads straight from
 * useSubscriptionStore rather than route params — `activate()` on the
 * payment screen already updates the store before navigating here.
 */
export default function SubscriptionSuccessScreen() {
  const insets = useSafeAreaInsets();
  const { planId, activatedAt, paymentMethodId } = useSubscriptionStore();
  const expiry = getExpiryDate(planId, activatedAt);

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <View style={{ flex: 1 }}>
        {/* Glow bleeds up behind the status bar, same asset/technique as
            the settings screen's header glow (app/(tabs)/profile.tsx). */}
        <View pointerEvents="none" style={{ position: "absolute", left: -242, top: -113, width: 796, height: 229 }}>
          <Image source={images.settingsGlow} style={{ width: "100%", height: "100%" }} contentFit="cover" />
        </View>

        <View className="flex-1 items-center justify-center gap-6 px-5" style={{ paddingBottom: insets.bottom + 24 }}>
          <View className="items-center gap-3">
            <Text className="font-li-ador-bold text-[42px] leading-[52px] tracking-[-0.3px] text-white">অভিনন্দন</Text>
            <Text className="max-w-[260px] text-center font-kalpurush text-[18px] leading-[26px] text-[#c8c7cc]">
              আপনার প্রিমিয়াম সাবস্ক্রিপ্সশনটি একটিভ হয়েছে
            </Text>
          </View>

          <SubscriptionInfoBox planId={planId} method={paymentMethodId} expiry={expiry} />

          <PrimaryButton onPress={() => router.dismissTo("/home")} className="mt-1">
            হোম পেজে ফিরে যান
          </PrimaryButton>
        </View>

        <ConfettiBurst />
      </View>
    </View>
  );
}
