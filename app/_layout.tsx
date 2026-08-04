import "@/global.css";

import { fontFamily } from "@/constants/theme";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

// Android native-stack transitions are backed by Fragments — going back
// briefly exposes the raw Activity window background between fragment
// surfaces. Left at its default (white) this shows as a flash/gap during
// back navigation, independent of any screen's own contentStyle.
SystemUI.setBackgroundColorAsync("#000000");

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!clerkPublishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env file");
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    [fontFamily.aeonikRegular]: require("@/assets/fonts/Aeonik-Regular.ttf"),
    [fontFamily.aeonikMedium]: require("@/assets/fonts/Aeonik-Medium.ttf"),
    [fontFamily.aeonikBold]: require("@/assets/fonts/Aeonik-Bold.ttf"),
    [fontFamily.liAdorLight]: require("@/assets/fonts/LiAdorNoirrit-Light.ttf"),
    [fontFamily.liAdorRegular]: require("@/assets/fonts/LiAdorNoirrit-Regular.ttf"),
    [fontFamily.liAdorSemiBold]: require("@/assets/fonts/LiAdorNoirrit-SemiBold.ttf"),
    [fontFamily.liAdorSemiBoldItalic]: require("@/assets/fonts/LiAdorNoirrit-SemiBoldItalic.ttf"),
    [fontFamily.liAdorBold]: require("@/assets/fonts/LiAdorNoirrit-Bold.ttf"),
    [fontFamily.kalpurush]: require("@/assets/fonts/Kalpurush-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: "#000000" },
        }}
      />
    </ClerkProvider>
  );
}
