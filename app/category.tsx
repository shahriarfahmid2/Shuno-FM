import { BookCover } from "@/components/BookCover";
import { images } from "@/constants/images";
import { CategoryBook, getCategory } from "@/data/category";
import { Image } from "expo-image";
import { Href, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const PAGE_SIZE = 10;
const THUMBNAIL_WIDTH = 89;
const THUMBNAIL_HEIGHT = 134;

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

function ClockIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path
        d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
        stroke="#ACACAC"
        strokeWidth={1}
      />
      <Path d="M6 3.5V6L7.7 7.1" stroke="#ACACAC" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronRightIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M6.75 13.5L11.25 9L6.75 4.5"
        stroke="#C8C7CC"
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ChevronLeftIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M11.25 13.5L6.75 9L11.25 4.5"
        stroke="#C8C7CC"
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CategoryBookRow({ book, onPress }: { book: CategoryBook; onPress: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="w-full flex-row items-center gap-[13px]"
      style={{ paddingLeft: 15, paddingRight: 20, paddingVertical: 14 }}
    >
      <BookCover
        source={book.cover}
        width={THUMBNAIL_WIDTH}
        height={THUMBNAIL_HEIGHT}
        radius={5}
        style={{ borderColor: "#3d3d3d" }}
      />
      {/* Height matches the cover so this can space-between: the title/author/
          description stay pinned together at the top (unchanged gap-5 between
          them) while the duration is pushed down to align with the cover's
          bottom edge, with open space separating it from the description. */}
      <View className="flex-1" style={{ height: THUMBNAIL_HEIGHT, justifyContent: "space-between" }}>
        <View className="gap-[5px]">
          <Text numberOfLines={1} className="font-aeonik-bold text-[18px] leading-[23px] text-white">
            {book.title}
          </Text>
          <Text numberOfLines={1} className="font-aeonik-regular text-[12px] leading-[16px] text-[#c8c7cc]">
            {book.author}
          </Text>
          <Text numberOfLines={2} className="font-kalpurush text-[12px] leading-[17px] text-[#acacac]">
            {book.description}
          </Text>
        </View>
        <View className="flex-row items-center gap-[6px]">
          <ClockIcon />
          <Text className="font-kalpurush text-[12px] leading-[14px] text-[#acacac]">{book.duration}</Text>
        </View>
      </View>
      <ChevronRightIcon />
    </TouchableOpacity>
  );
}

function PaginationButton({
  label,
  icon,
  iconPosition,
  disabled,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  iconPosition: "left" | "right";
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
      className="flex-row items-center gap-[6px] rounded-[20px] bg-[#161616] px-[16px] py-[10px]"
      style={{ opacity: disabled ? 0.4 : 1 }}
    >
      {iconPosition === "left" && icon}
      <Text className="font-aeonik-bold text-[12.5px] leading-[16px] text-[#c8c7cc]">{label}</Text>
      {iconPosition === "right" && icon}
    </TouchableOpacity>
  );
}

/**
 * Figma "Category page" (node 6648:4907) — pushed from the "বিজনেস ই-বুক"
 * section's "See all" link on home and explore, so it wires its own top
 * safe-area inset and has no bottom menu, matching app/author.tsx. Figma
 * only shows 5 books with no pagination; the "Showing X of Y" counter and
 * next/previous paging (10 books per page) were added on top of that design.
 */
export default function CategoryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const { id } = useLocalSearchParams<{ id?: string }>();
  const category = getCategory(id);
  const [page, setPage] = useState(0);

  const totalBooks = category.books.length;
  const totalPages = Math.max(1, Math.ceil(totalBooks / PAGE_SIZE));
  const visibleBooks = category.books.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const goToPage = (nextPage: number) => {
    setPage(nextPage);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      >
        <View>
          {/* Glow bleeds up behind the status bar, same asset/technique as
              the home screen's header glow (app/(tabs)/home.tsx). */}
          <View
            pointerEvents="none"
            style={{ position: "absolute", left: "50%", marginLeft: -233.5, top: -220, width: 467, height: 364 }}
          >
            <Image source={images.homeGlow} style={{ width: "100%", height: "100%" }} contentFit="contain" />
          </View>

          <View className="flex-row items-center px-[17px]" style={{ paddingTop: insets.top + 16, paddingBottom: 8 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={8}
              onPress={() => router.back()}
              className="size-[30px] items-center justify-center"
            >
              <BackArrowIcon />
            </TouchableOpacity>
            <Text
              className="flex-1 text-center font-li-ador-semibold text-[17px] leading-[22px] text-white"
              style={{ marginRight: 30 }}
            >
              {category.title}
            </Text>
          </View>
        </View>

        <Text className="mt-2 px-[17px] pb-2 font-aeonik-regular text-[13px] leading-[16px] text-[#8a8a8a]">
          Showing {visibleBooks.length} of {totalBooks} audiobooks
        </Text>

        <View>
          {visibleBooks.map((book, index) => (
            <View key={book.id}>
              <CategoryBookRow book={book} onPress={() => router.push({ pathname: "/book", params: { id: book.id } } as Href)} />
              {index < visibleBooks.length - 1 && <View className="h-px w-full bg-[#38383b]" />}
            </View>
          ))}
        </View>

        {totalPages > 1 && (
          <View className="mt-2 flex-row items-center justify-between px-[17px] py-4">
            <PaginationButton
              label="Previous"
              icon={<ChevronLeftIcon />}
              iconPosition="left"
              disabled={page === 0}
              onPress={() => goToPage(Math.max(0, page - 1))}
            />
            <Text className="font-aeonik-regular text-[12px] leading-[16px] text-[#8a8a8a]">
              Page {page + 1} of {totalPages}
            </Text>
            <PaginationButton
              label="Next"
              icon={<ChevronRightIcon />}
              iconPosition="right"
              disabled={page === totalPages - 1}
              onPress={() => goToPage(Math.min(totalPages - 1, page + 1))}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
