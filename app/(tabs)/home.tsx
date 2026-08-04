import { AuthorCard } from "@/components/AuthorCard";
import { BookCover } from "@/components/BookCover";
import { FeaturedBookCarousel } from "@/components/FeaturedBookCarousel";
import { SectionHeader } from "@/components/SectionHeader";
import { images } from "@/constants/images";
import { businessEbooks, featuredBooks, podcastSummaries, popularAuthors } from "@/data/home";
import { Image } from "expo-image";
import { Href, Stack, useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useRef } from "react";
import { BackHandler, Platform, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

// How long a second back-press has to land, after the first, to exit —
// matches the double-tap-to-exit window most Android apps use.
const EXIT_CONFIRM_WINDOW_MS = 2000;

function NotificationIcon() {
  return (
    <Svg width={19} height={21.4} viewBox="0 1 16 18" fill="none">
      <Path
        d="M10.1816 16.9229C10.1816 18.07 9.20509 19 8 19C6.79499 18.9999 5.81836 18.0699 5.81836 16.9229H10.1816ZM7.99902 1C8.80266 1 9.4541 1.61977 9.4541 2.38477V2.58594C11.5567 3.18178 13.0897 5.03545 13.0898 7.23047V9.13965C13.0899 11.0204 13.8748 12.8235 15.2715 14.1533H15.2725C15.6739 14.1535 15.9988 14.4636 15.999 14.8457C15.999 15.1802 15.7503 15.4598 15.4189 15.5244L15.2725 15.5381H0.726562V15.5371C0.325228 15.5367 0 15.2278 0 14.8457C0.000179291 14.4635 0.325988 14.1533 0.727539 14.1533C2.12409 12.8235 2.90818 11.0202 2.9082 9.13965V7.23047C2.90839 5.03531 4.44213 3.18166 6.54492 2.58594V2.38477C6.54492 1.61991 7.19559 1.00023 7.99902 1Z"
        fill="white"
      />
    </Svg>
  );
}

/**
 * The magnifying glass's handle is drawn with a bezier bump whose control
 * points (y≈19.08) sit past the path's own endpoints (y=18.77) — the curve
 * bulges slightly beyond a tight bounding box, so a viewBox fit exactly to
 * the anchor coordinates clipped the rounded tip of the handle. Padded on
 * every side here so nothing gets cut off, and sized up a bit per request.
 */
function HeaderSearchIcon() {
  return (
    <Svg width={23} height={22.7} viewBox="35 -1 21 21" fill="none">
      <Path
        d="M43.917 0C48.2891 0.000176005 51.833 3.54485 51.833 7.91699C51.8329 9.81792 51.1617 11.5611 50.0449 12.9258L54.7686 17.6484C55.0776 17.9576 55.0777 18.4594 54.7686 18.7686C54.4594 19.0777 53.9576 19.0776 53.6484 18.7686L48.9258 14.0449C47.5611 15.1617 45.8179 15.8329 43.917 15.833C39.5448 15.833 36.0002 12.2891 36 7.91699C36 3.54474 39.5447 0 43.917 0ZM43.917 1.58301C40.4192 1.58301 37.583 4.41919 37.583 7.91699C37.5832 11.4146 40.4193 14.25 43.917 14.25C47.4145 14.2498 50.2498 11.4145 50.25 7.91699C50.25 4.4193 47.4146 1.58318 43.917 1.58301Z"
        fill="white"
      />
    </Svg>
  );
}

/** Figma "Home Page (Black)" (node 101:1676). */
export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const lastBackPressRef = useRef(0);

  // Home is meant to always be the root of the stack (app entry replaces
  // straight to it) — so a bare back press here would otherwise exit
  // immediately. Require a second press within the window instead.
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== "android") {
        return;
      }

      const onBackPress = () => {
        if (router.canGoBack()) {
          return false;
        }

        const now = Date.now();
        if (now - lastBackPressRef.current < EXIT_CONFIRM_WINDOW_MS) {
          BackHandler.exitApp();
          return true;
        }

        lastBackPressRef.current = now;
        ToastAndroid.show("আবার ব্যাক বাটনে চাপুন অ্যাপ বন্ধ করতে", ToastAndroid.SHORT);
        return true;
      };

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => subscription.remove();
    }, [router]),
  );

  return (
    // No bottom inset here — the shared tab bar (app/(tabs)/_layout.tsx)
    // handles the home-indicator safe area below this screen's content.
    // Insetting the top would make SafeAreaView paint its own solid black
    // block behind the status bar, cutting the glow off with a hard seam.
    // The status bar area instead gets real page content (the glow) drawn
    // behind it (see below); the header row adds its own insets.top padding
    // so it isn't obscured.
    <SafeAreaView edges={[]} style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header + hero share one glow backdrop, matching Figma's Ellipse 2
            (node 101:1681) bleeding up behind both — and behind the status
            bar, since this container starts at the true screen top. */}
        <View>
          <View pointerEvents="none" style={{ position: "absolute", left: "50%", marginLeft: -233.5, top: -114, width: 467, height: 364 }}>
            <Image source={images.homeGlow} style={{ width: "100%", height: "100%" }} contentFit="contain" />
          </View>

          <View className="flex-row items-center justify-between px-4" style={{ paddingTop: insets.top + 16 }}>
            <View className="flex-row items-center gap-[10px]">
              {/* logo.png's square canvas has an opaque off-white fill behind
                  the red circle — clip to a circle so only the circle shows. */}
              <View style={{ width: 32, height: 32, borderRadius: 16, overflow: "hidden" }}>
                <Image source={images.logo} style={{ width: 32, height: 32 }} contentFit="cover" />
              </View>
              <Text className="font-li-ador-semibold text-[20px] leading-[25px] text-white">শুনো FM</Text>
            </View>
            <View className="flex-row items-center gap-5">
              <TouchableOpacity activeOpacity={0.7} hitSlop={8} onPress={() => router.push("/notifications")}>
                <NotificationIcon />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} hitSlop={8} onPress={() => router.push("/search")}>
                <HeaderSearchIcon />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 40 }}>
            <FeaturedBookCarousel books={featuredBooks} onOpenBook={(book) => router.push({ pathname: "/book", params: { id: book.id } } as Href)} />
          </View>
        </View>

        <SectionHeader
          title="বিজনেস ই-বুক"
          className="mt-8"
          // Cast needed — "/category" isn't in expo-router's generated route
          // types yet (.expo/types/router.d.ts regenerates on the next
          // `expo start`/build); it's a real, existing route.
          onSeeAll={() => router.push({ pathname: "/category", params: { id: "business" } } as Href)}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 15, paddingHorizontal: 16, paddingTop: 16 }}
        >
          {businessEbooks.map((book, index) => (
            <TouchableOpacity key={`${book.id}-${index}`} activeOpacity={0.7} onPress={() => router.push({ pathname: "/book", params: { id: book.id } } as Href)}>
              <BookCover source={book.cover} width={80} height={120} radius={6} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <SectionHeader
          title="বেস্ট সেলার লেখক"
          className="mt-8"
          // Cast needed — "/authors" isn't in expo-router's generated route
          // types yet (.expo/types/router.d.ts regenerates on the next
          // `expo start`/build); it's a real, existing route.
          onSeeAll={() => router.push("/authors" as Href)}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 15, paddingHorizontal: 16, paddingTop: 16 }}
        >
          {popularAuthors.map((author) => (
            <TouchableOpacity key={author.id} activeOpacity={0.7} onPress={() => router.push({ pathname: "/author", params: { id: author.id } } as Href)}>
              <AuthorCard name={author.name} avatar={author.avatar} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <SectionHeader title="ইউটিউব পডকাস্ট সামারি" className="mt-8" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingHorizontal: 16, paddingTop: 16 }}
        >
          {podcastSummaries.map((podcast) => (
            <TouchableOpacity key={podcast.id} activeOpacity={0.7} onPress={() => router.push({ pathname: "/book", params: { id: podcast.id } } as Href)}>
              <BookCover source={podcast.thumbnail} width={169} height={95} radius={8} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
