import { images } from "@/constants/images";
import { AuthorCategory, AuthorListItem, authorCategories, authors } from "@/data/author";
import { Image } from "expo-image";
import { Href, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const PAGE_SIZE = 10;
const CARD_GAP = 16;
const HORIZONTAL_PADDING = 20;

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

function SearchIcon() {
  return (
    <Svg width={17} height={17} viewBox="0 0 17 17" fill="none">
      <Path
        d="M7.79167 12.75C10.5301 12.75 12.75 10.5301 12.75 7.79167C12.75 5.05325 10.5301 2.83333 7.79167 2.83333C5.05325 2.83333 2.83333 5.05325 2.83333 7.79167C2.83333 10.5301 5.05325 12.75 7.79167 12.75Z"
        stroke="#C8C7CC"
        strokeWidth={1.73542}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.1667 14.1667L11.7583 11.7583"
        stroke="#C8C7CC"
        strokeWidth={1.73542}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function SlidersIcon() {
  return (
    <Svg width={17} height={17} viewBox="0 0 17 17" fill="none">
      <Path
        d="M2.83333 4.25H10.625M13.4583 4.25H14.1667M2.83333 8.5H7.08333M9.91667 8.5H14.1667M2.83333 12.75H12.0417M14.875 12.75H14.1667"
        stroke="white"
        strokeWidth={1.73542}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.0417 5.80833C12.9023 5.80833 13.6 5.11064 13.6 4.25C13.6 3.38936 12.9023 2.69167 12.0417 2.69167C11.181 2.69167 10.4833 3.38936 10.4833 4.25C10.4833 5.11064 11.181 5.80833 12.0417 5.80833Z"
        stroke="white"
        strokeWidth={1.73542}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.08333 10.0583C7.94398 10.0583 8.64167 9.36064 8.64167 8.5C8.64167 7.63936 7.94398 6.94167 7.08333 6.94167C6.22269 6.94167 5.525 7.63936 5.525 8.5C5.525 9.36064 6.22269 10.0583 7.08333 10.0583Z"
        stroke="white"
        strokeWidth={1.73542}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.0417 14.3083C12.9023 14.3083 13.6 13.6106 13.6 12.75C13.6 11.8894 12.9023 11.1917 12.0417 11.1917C11.181 11.1917 10.4833 11.8894 10.4833 12.75C10.4833 13.6106 11.181 14.3083 12.0417 14.3083Z"
        stroke="white"
        strokeWidth={1.73542}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CrossIcon() {
  return (
    <Svg width={10} height={10} viewBox="0 0 10 10" fill="none">
      <Path d="M1.5 1.5L8.5 8.5M1.5 8.5L8.5 1.5" stroke="#8E8E93" strokeWidth={1.3} strokeLinecap="round" />
    </Svg>
  );
}

function CheckIcon() {
  return (
    <Svg width={13} height={13} viewBox="0 0 13 13" fill="none">
      <Path
        d="M10.8333 3.25L4.875 9.20833L2.16667 6.5"
        stroke="#59B87A"
        strokeWidth={1.66833}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

function AuthorCardView({ author, width, onPress }: { author: AuthorListItem; width: number; onPress: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{ width }}
      className="items-center gap-[10px] rounded-[14px] border border-[#5d5d5d] px-4 pb-[14px] pt-[18px]"
    >
      <View className="size-[84px] overflow-hidden rounded-full bg-white">
        <Image
          source={author.avatar}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          contentPosition={author.avatarPosition}
        />
      </View>
      {/* Explicit full width (instead of relying on the parent's
          items-center to shrink-wrap) so long text — Robert Kiyosaki's 3-tag
          line especially — wraps/centers within the card instead of
          overflowing past its border into the next card, which was cutting
          off his book-count line entirely. */}
      <View className="w-full gap-[6px]" style={{ paddingHorizontal: 4 }}>
        <Text numberOfLines={1} className="text-center font-aeonik-bold text-[16px] leading-[24px] text-white">
          {author.name}
        </Text>
        <Text numberOfLines={2} className="text-center font-kalpurush text-[13.5px] leading-[20px] text-[#9c9ca8]">
          {author.tagsLabel}
        </Text>
        <Text className="text-center font-kalpurush text-[13.5px] leading-[20px] text-[#59b87a]">
          বই সংখ্যা : {author.bookCount}
        </Text>
      </View>
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
 * Bottom-sheet category picker opened from the filter button beside the
 * search bar. Multi-select — each row toggles independently and results
 * filter live, so the sheet just closes via the backdrop tap or hardware
 * back (no separate "Apply" step). No Figma source — built to match the
 * app's existing modal/sheet treatments (e.g. app/downloads.tsx's
 * RemoveDownloadModal).
 */
function CategoryFilterSheet({
  visible,
  categories,
  selectedIds,
  onClearAll,
  onToggleCategory,
  onClose,
}: {
  visible: boolean;
  categories: AuthorCategory[];
  selectedIds: string[];
  onClearAll: () => void;
  onToggleCategory: (id: string) => void;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" }}>
        {/* Swallow taps on the sheet itself so they don't bubble to the
            backdrop Pressable and dismiss the sheet. */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="rounded-t-[24px] border border-b-0 border-[#2c2c2c] bg-[#161616] px-5 pt-3"
          style={{ paddingBottom: insets.bottom + 20 }}
        >
          <View className="h-1 w-9 self-center rounded-full bg-[#3d3d3d]" />
          <Text className="mt-4 font-li-ador-semibold text-[17px] leading-[22px] text-white">ক্যাটাগরি বেছে নিন</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClearAll}
            className="mt-3 flex-row items-center justify-between py-3"
          >
            <Text className="font-kalpurush text-[15px] leading-[22px] text-white">সব লেখক</Text>
            {selectedIds.length === 0 && <CheckIcon />}
          </TouchableOpacity>
          <View className="h-px bg-[#2a2a2a]" />

          {categories.map((category, index) => (
            <View key={category.id}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onToggleCategory(category.id)}
                className="flex-row items-center justify-between py-3"
              >
                <Text className="font-kalpurush text-[15px] leading-[22px] text-white">{category.label}</Text>
                {selectedIds.includes(category.id) && <CheckIcon />}
              </TouchableOpacity>
              {index < categories.length - 1 && <View className="h-px bg-[#2a2a2a]" />}
            </View>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/**
 * Figma "Home Page (Black)" (node 6646:4284) — actually the author listing
 * page, "See all" target for the home screen's "বেস্ট সেলার লেখক" section.
 * Figma only shows 4 author cards with no search/filter interaction wired
 * up and no back button — the search input, filter sheet, "Showing X of Y"
 * counter, and next/previous paging (10 authors per page) were added on top
 * of that design, mirroring the pattern already used for app/category.tsx.
 * A back button was also added since this is a pushed (non-tab) screen.
 */
export default function AuthorsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [page, setPage] = useState(0);

  const filteredAuthors =
    selectedCategoryIds.length > 0
      ? authors.filter((item) => item.categoryIds.some((id) => selectedCategoryIds.includes(id)))
      : authors;
  const totalAuthors = filteredAuthors.length;
  const totalPages = Math.max(1, Math.ceil(totalAuthors / PAGE_SIZE));
  const visibleAuthors = filteredAuthors.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const selectedCategories = authorCategories.filter((category) => selectedCategoryIds.includes(category.id));
  const cardWidth = (width - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;

  const goToPage = (nextPage: number) => {
    setPage(nextPage);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleToggleCategory = (id: string) => {
    setSelectedCategoryIds((current) =>
      current.includes(id) ? current.filter((categoryId) => categoryId !== id) : [...current, id],
    );
    setPage(0);
  };

  const handleClearFilter = () => {
    setSelectedCategoryIds([]);
    setPage(0);
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
              the home screen's header glow (app/(tabs)/home.tsx) — this
              page's Figma ellipse shares the exact same size/position. */}
          <View
            pointerEvents="none"
            style={{ position: "absolute", left: "50%", marginLeft: -233.5, top: -220, width: 467, height: 364 }}
          >
            <Image source={images.homeGlow} style={{ width: "100%", height: "100%" }} contentFit="contain" />
          </View>

          <View className="px-5" style={{ paddingTop: insets.top + 16 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={8}
              onPress={() => router.back()}
              className="size-[30px] items-center justify-center"
            >
              <BackArrowIcon />
            </TouchableOpacity>

            <View className="mt-3 gap-2">
              <Text className="font-li-ador-semibold text-[30px] leading-[39px] text-white">লেখক</Text>
              <View className="h-1 w-[46px] rounded-full bg-primary" />
            </View>
          </View>
        </View>

        <View className="mt-5 flex-row items-center gap-[10px] px-[17px] pb-2">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/author-search" as Href)}
            className="h-[46px] flex-1 flex-row items-center gap-[10px] rounded-[14px] border border-[#333] bg-[#131313] px-[14px]"
          >
            <SearchIcon />
            <Text className="flex-1 font-aeonik-regular text-[13px] text-[#c8c7cc]">Search by author name</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setFilterVisible(true)}
            className="size-[46px] items-center justify-center rounded-[14px] border border-[#333] bg-[#131313]"
          >
            <SlidersIcon />
          </TouchableOpacity>
        </View>

        {selectedCategories.length > 0 && (
          <View className="mt-2 flex-row flex-wrap items-center gap-2 px-[17px] pb-2">
            {selectedCategories.map((category) => (
              <View
                key={category.id}
                className="flex-row items-center gap-[6px] rounded-[14px] bg-[#282828] py-[7px] pl-3 pr-[10px]"
              >
                <Text className="font-kalpurush text-[13px] leading-[18px] text-white">{category.label}</Text>
                <TouchableOpacity activeOpacity={0.7} hitSlop={8} onPress={() => handleToggleCategory(category.id)}>
                  <CrossIcon />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={8}
              onPress={handleClearFilter}
              className="flex-row items-center gap-1 py-[7px]"
            >
              <Text className="font-aeonik-medium text-[13px] leading-[18px]" style={{ color: "#e04242" }}>
                Clear all
              </Text>
              <CrossIcon />
            </TouchableOpacity>
          </View>
        )}

        <Text className="mt-3 px-[17px] pb-2 font-aeonik-regular text-[13px] leading-4 text-[#8a8a8a]">
          Showing {visibleAuthors.length} of {totalAuthors} authors
        </Text>

        {visibleAuthors.length > 0 ? (
          <View className="flex-row flex-wrap px-5" style={{ columnGap: CARD_GAP, rowGap: 23, paddingTop: 8 }}>
            {visibleAuthors.map((item) => (
              <AuthorCardView key={item.id} author={item} width={cardWidth} onPress={() => router.push({ pathname: "/author", params: { id: item.id } } as Href)} />
            ))}
          </View>
        ) : (
          <View className="items-center" style={{ marginTop: 80 }}>
            <Text className="font-aeonik-medium text-[16px] leading-[17px] text-white">কোনো লেখক পাওয়া যায়নি</Text>
          </View>
        )}

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

      <CategoryFilterSheet
        visible={filterVisible}
        categories={authorCategories}
        selectedIds={selectedCategoryIds}
        onClearAll={handleClearFilter}
        onToggleCategory={handleToggleCategory}
        onClose={() => setFilterVisible(false)}
      />
    </View>
  );
}
