import { BookCover } from "@/components/BookCover";
import { images } from "@/constants/images";
import { getAuthor } from "@/data/author";
import { Image } from "expo-image";
import { Href, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

function BackArrowIcon() {
  return (
    <Svg width={16.5} height={14} viewBox="0 0 16.5 14" fill="none">
      <Path
        d="M0.75 7H15.75M7 13.25L0.75 7L7 0.75"
        stroke="#ffffff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * Figma "Author Page" (node 6575:44568) — pushed from a book/author link,
 * so it wires its own top safe-area inset and has no bottom menu.
 */
export default function AuthorScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const author = getAuthor(id);

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View>
          {/* Glow bleeds up behind the status bar, same technique as the
              history/library/favourites screens' header glow. */}
          <View
            pointerEvents="none"
            style={{ position: "absolute", left: -242, top: -113, width: 467, height: 229 }}
          >
            <Image source={images.authorGlow} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          </View>

          <View className="px-[22px]" style={{ paddingTop: insets.top + 16 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={8}
              onPress={() => router.back()}
              className="size-[30px] items-center justify-center"
            >
              <BackArrowIcon />
            </TouchableOpacity>

            <View className="mt-[26px] size-[104px] overflow-hidden rounded-full bg-[#1a1a1a]">
              <Image source={author.avatar} style={{ width: "100%", height: "100%" }} contentFit="cover" />
            </View>

            <Text className="mt-6 font-li-ador-bold text-[24px] leading-[31px] text-white">{author.name}</Text>

            <Text className="mt-[10px] pr-[11px] font-kalpurush text-[14px] leading-[22px] text-[#aeaeae]">
              {author.bio}
            </Text>

            <Text className="mt-[58px] font-li-ador-regular text-[16px] leading-[21px] text-white">বুক লিস্ট :</Text>

            <View className="mt-4 flex-row flex-wrap gap-3">
              {author.books.map((book) => (
                <TouchableOpacity key={book.id} activeOpacity={0.7} onPress={() => router.push({ pathname: "/book", params: { id: book.id } } as Href)}>
                  <BookCover source={book.cover} width={98} height={145} radius={6} style={{ borderColor: "#606060" }} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
