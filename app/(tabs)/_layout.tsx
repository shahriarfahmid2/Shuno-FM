import { BottomMenu } from "@/components/BottomMenu";
import { useAuth } from "@clerk/expo";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Href, Redirect, Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const TAB_KEYS = ["home", "explore", "library", "profile"] as const;
type TabKey = (typeof TAB_KEYS)[number];

function isTabKey(name: string): name is TabKey {
  return (TAB_KEYS as readonly string[]).includes(name);
}

/**
 * Renders the Figma "Menu" component (BottomMenu) as the tab bar instead of
 * React Navigation's default, so switching tabs swaps content in place —
 * no slide transition, no back-stack entry (unlike the old setup where
 * Home/Explore were sibling Stack screens and every tap pushed a new page).
 */
function TabBar({ state, navigation }: BottomTabBarProps) {
  const routeName = state.routes[state.index].name;
  const active = isTabKey(routeName) ? routeName : "home";

  return (
    <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#000000" }}>
      <BottomMenu
        variant="black"
        active={active}
        onSelect={(key) => {
          if (state.routes.some((route) => route.name === key)) {
            navigation.navigate(key);
          }
        }}
      />
    </SafeAreaView>
  );
}

export default function TabsLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href={"/onboarding" as Href} />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="library" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
