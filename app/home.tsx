import { PrimaryButton } from "@/components/PrimaryButton";
import { useAuth, useClerk } from "@clerk/expo";
import { Href, Redirect, Stack } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Bare placeholder — real home screen gets built out from Figma next, same
// as the onboarding screens were.
export default function HomeScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    // Cast needed because of expo-router's Windows nested-index typegen bug
    // (see app/index.tsx) — "/onboarding" is the actually-navigable form.
    return <Redirect href={"/onboarding" as Href} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Stack.Screen options={{ contentStyle: { backgroundColor: "#ffffff" } }} />
      <Text className="p-6 font-aeonik-bold text-[28px] leading-[35px] text-ink">
        Home
      </Text>
      <View className="mt-auto p-6">
        <PrimaryButton variant="black" onPress={() => signOut()}>
          Log out
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}
