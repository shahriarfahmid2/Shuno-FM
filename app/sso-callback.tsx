import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";

/**
 * Fallback screen for the OAuth redirect URL Clerk's useSSO() uses
 * (AuthSession.makeRedirectUri({ path: "sso-callback" }) -> "/--/sso-callback").
 * expo-web-browser's in-app auth session is meant to intercept that redirect
 * itself and resolve startSSOFlow() without ever navigating here, but on some
 * Android devices the OS also hands the same redirect to Expo Router's own
 * deep-link handling, which would otherwise show "Unmatched Route" for the
 * second or so before startSSOFlow() resolves and the caller (auth-sheet.tsx /
 * sign-up.tsx) replaces this with /home. This just keeps that moment looking
 * like part of the app instead of a broken page — it has no logic of its own.
 */
export default function SSOCallbackScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}
