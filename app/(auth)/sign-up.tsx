import { images } from "@/constants/images";
import { useSSO } from "@clerk/expo";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { ActivityIndicator, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";

const COVER_SLOT_SIZE = { width: 89.911, height: 124.573 };
const COVER_CARD_SIZE = { width: 82.104, height: 119.706 };

type BookCoverSlot = {
  image: ImageSourcePropType;
  left: number;
  top: number;
};

// Shifts the whole collage up/down as one knob, on top of the Figma-sourced
// positions below (kept as-authored so they stay traceable back to the
// design). Negative moves everything up.
const BOOK_ROWS_OFFSET_Y = -40;

// Three-row static collage — each slot's left/top comes straight from the
// Figma node geometry (node 6426:908's and 6433:611-619's children), which
// cascades in a gentle diagonal per row rather than flat lines. Figma reuses
// a couple of covers across rows (book6 and book10 each appear twice, and
// book7/book10 also appear in the top row) — reproduced as-is for fidelity.
const BOOK_COVERS: BookCoverSlot[] = [
  // Top row
  { image: images.onboardingBook11, left: -39, top: 184.16 },
  { image: images.onboardingBook7, left: 64.87, top: 177.65 },
  { image: images.onboardingBook12, left: 168.74, top: 171.15 },
  { image: images.onboardingBook13, left: 272.61, top: 164.64 },
  { image: images.onboardingBook10, left: 376.48, top: 158.13 },
  // Middle row
  { image: images.onboardingBook1, left: -65.28, top: 324.31 },
  { image: images.onboardingBook2, left: 38.59, top: 317.8 },
  { image: images.onboardingBook3, left: 142.46, top: 311.29 },
  { image: images.onboardingBook4, left: 246.33, top: 304.79 },
  { image: images.onboardingBook5, left: 350.2, top: 298.28 },
  // Bottom row
  { image: images.onboardingBook6, left: -73, top: 469.16 },
  { image: images.onboardingBook6, left: 30.87, top: 462.65 },
  { image: images.onboardingBook8, left: 134.74, top: 456.15 },
  { image: images.onboardingBook9, left: 238.61, top: 449.64 },
  { image: images.onboardingBook10, left: 342.48, top: 443.13 },
];

function BookCover({ cover }: { cover: BookCoverSlot }) {
  return (
    <View
      style={{
        position: "absolute",
        left: cover.left,
        top: cover.top + BOOK_ROWS_OFFSET_Y,
        width: COVER_SLOT_SIZE.width,
        height: COVER_SLOT_SIZE.height,
        alignItems: "center",
        justifyContent: "center",
        // Pinned explicitly: the card's own elevation (below, for its drop
        // shadow) can otherwise promote it above later siblings on Android
        // regardless of JSX order, which is why the fade view further down
        // needs a higher zIndex to actually land on top of these on device.
        zIndex: 1,
      }}
    >
      {/* Shadow lives on its own (unclipped) view — combining RN's shadow*
          props with overflow:"hidden" on the same rotated view renders the
          shadow clipped/inverted into a dark wedge over the image instead of
          a soft drop shadow behind it, so the rounded/clipped card is nested
          one level in. */}
      <View
        style={{
          width: COVER_CARD_SIZE.width,
          height: COVER_CARD_SIZE.height,
          borderRadius: 2,
          transform: [{ rotate: "-3.58deg" }, { skewX: "0.23deg" }],
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.09,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#bbbbbb",
            backgroundColor: "#ffffff",
            overflow: "hidden",
          }}
        >
          <Image source={cover.image} style={{ width: "100%", height: "100%" }} contentFit="cover" />
        </View>
      </View>
    </View>
  );
}

type AuthButtonProps = {
  icon: ImageSourcePropType;
  iconSize: { width: number; height: number };
  label: string;
  top: number;
  variant: "primary" | "white";
  onPress?: () => void;
  loading?: boolean;
};

function AuthButton({ icon, iconSize, label, top, variant, onPress, loading }: AuthButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={loading}
      // Above the book covers and glow image below (the glow's box overlaps
      // the google button's area), matching Figma's own paint order which
      // puts these buttons in front, unaffected.
      style={{ position: "absolute", left: 42, top, width: 307, height: 53, zIndex: 3 }}
      className={
        variant === "primary"
          ? "flex-row items-center justify-center gap-2 rounded-full border border-[#E2E2E2] bg-primary"
          : "flex-row items-center justify-center gap-2 rounded-full border border-black/10 bg-white"
      }
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#ffffff" : "#000000"} />
      ) : (
        <>
          <Image source={icon} style={iconSize} contentFit="contain" />
          <Text
            className={
              variant === "primary"
                ? "font-aeonik-medium text-[16px] leading-[19.2px] text-white"
                : "font-aeonik-medium text-[16px] leading-[19.2px] text-black"
            }
          >
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

/** Figma "Sign-up with email" (node 6426:904). */
export default function SignUpScreen() {
  const { startSSOFlow } = useSSO();
  const [ssoLoading, setSsoLoading] = useState(false);

  // Pre-warms Android's Custom Tab process so tapping "Continue with
  // google" doesn't pay that cold-start cost on top of the OAuth round
  // trip — shaves visible latency off the browser-open/close handoff.
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    setSsoLoading(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        // dismissAll() first clears the onboarding/sign-up screens still
        // sitting underneath in the stack — without it, back from home would
        // walk straight back through the auth flow instead of leaving the app.
        router.dismissAll();
        router.replace("/onboarding/welcome");
      }
      // No createdSessionId means the user cancelled — nothing to do.
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setSsoLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      {/* Same flattened background gradient as onboarding page 3 (byte-identical
          export) — full-bleed, single layer. */}
      <Image
        source={images.onboardingGlow5Top}
        style={{ position: "absolute", left: 0, top: 0, width: 393, height: 852 }}
        contentFit="cover"
      />

      {BOOK_COVERS.map((cover, index) => (
        <BookCover key={index} cover={cover} />
      ))}

      {/* Wrapped in a plain View so pointerEvents:"none" is guaranteed to be
          honored on native — expo-image's underlying native view doesn't
          reliably forward that prop the way a core RN View does, and this
          decorative glow otherwise sits (zIndex 4) on top of and blocks taps
          on the email button (zIndex 3) beneath it. */}
      <View
        style={{ position: "absolute", left: 0, top: 345, width: 463, height: 318, zIndex: 4 }}
        pointerEvents="none"
      >
        <Image source={images.onboardingGlow4Mid} style={{ width: "100%", height: "100%" }} contentFit="cover" />
      </View>

      <Text
        style={{ position: "absolute", left: 58, top: 528, width: 277, zIndex: 5 }}
        className="text-center font-li-ador-regular text-[24px] leading-[31.2px] text-white"
      >
        একাউন্ট ক্রিয়েট করুন
      </Text>

      <AuthButton
        icon={images.onboardingMessageIcon}
        iconSize={{ width: 21, height: 18 }}
        label="Continue with email"
        top={580}
        variant="primary"
        onPress={() => router.push({ pathname: "/auth-sheet", params: { mode: "signup" } })}
      />

      <AuthButton
        icon={images.onboardingGmailIcon}
        iconSize={{ width: 20, height: 20 }}
        label="Continue with google"
        top={650}
        variant="white"
        onPress={handleGoogleSignIn}
        loading={ssoLoading}
      />

      <Text
        style={{ position: "absolute", left: 79, top: 721, width: 236 }}
        className="text-center font-kalpurush text-[16px] leading-[22.56px] text-white"
      >
        অলরেডি একাউন্ট আছে?{" "}
        <Text className="underline" onPress={() => router.push("/auth-sheet")}>
          লগিন করুন
        </Text>
      </Text>
    </View>
  );
}
