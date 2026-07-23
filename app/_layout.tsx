import "@/global.css";

import { fontFamily } from "@/constants/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    [fontFamily.aeonikRegular]: require("@/assets/fonts/Aeonik-Regular.ttf"),
    [fontFamily.aeonikMedium]: require("@/assets/fonts/Aeonik-Medium.ttf"),
    [fontFamily.aeonikBold]: require("@/assets/fonts/Aeonik-Bold.ttf"),
    [fontFamily.liAdorRegular]: require("@/assets/fonts/LiAdorNoirrit-Regular.ttf"),
    [fontFamily.liAdorSemiBold]: require("@/assets/fonts/LiAdorNoirrit-SemiBold.ttf"),
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

  return <Stack />;
}
