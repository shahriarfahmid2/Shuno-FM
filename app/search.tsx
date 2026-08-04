import { BookCover } from "@/components/BookCover";
import { BottomMenu } from "@/components/BottomMenu";
import { images } from "@/constants/images";
import { SearchableBook, searchBooks } from "@/data/search";
import { splitOnMatch } from "@/lib/text";
import { useSearchHistoryStore } from "@/store/useSearchHistoryStore";
import { Image } from "expo-image";
import { Href, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

function SearchIcon({ size = 17 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 17" fill="none">
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

function ClockIcon() {
  return (
    <Svg width={11} height={11} viewBox="0 0 11 11" fill="none">
      <Path
        d="M5.5 10.5C8.26142 10.5 10.5 8.26142 10.5 5.5C10.5 2.73858 8.26142 0.5 5.5 0.5C2.73858 0.5 0.5 2.73858 0.5 5.5C0.5 8.26142 2.73858 10.5 5.5 10.5Z"
        stroke="#c8c7cc"
        strokeWidth={1}
      />
      <Path d="M5.5 3V5.5L7.2 6.6" stroke="#c8c7cc" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
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

function ClearIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M4 4L12 12M4 12L12 4"
        stroke="#8E8E93"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function BackIcon() {
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

function HistoryChip({ query, onSelect, onRemove }: { query: string; onSelect: () => void; onRemove: () => void }) {
  return (
    <View className="flex-row items-center justify-between px-[17px]" style={{ height: 34 }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onSelect}
        className="flex-row items-center gap-2 self-start rounded-[14px] bg-[#282828] pl-2 pr-3"
        style={{ height: 26 }}
      >
        <ClockIcon />
        {/* includeFontPadding/textAlignVertical: Android adds extra
            leading above/below custom-font glyphs by default, which made
            this text sit visibly lower than the cross icon beside it even
            though both are centered in equal-height boxes. */}
        <Text
          className="font-aeonik-regular text-[12px] leading-[17px] text-white"
          style={{ includeFontPadding: false, textAlignVertical: "center" }}
        >
          {query}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        hitSlop={8}
        onPress={onRemove}
        style={{ height: 26, width: 26, alignItems: "center", justifyContent: "center" }}
      >
        <CrossIcon />
      </TouchableOpacity>
    </View>
  );
}

/**
 * Live suggestion row — the part of the title/author matching what's typed
 * is white, the rest is grey. Matching runs against title first; if the
 * query only matched the author (searchBooks() matches both), the author
 * line is shown instead so it's clear why that book is in the list rather
 * than it looking like an unrelated title.
 */
function SuggestionRow({
  book,
  query,
  onSelect,
  showDivider,
}: {
  book: SearchableBook;
  query: string;
  onSelect: () => void;
  showDivider: boolean;
}) {
  const trimmedQuery = query.trim();
  const titleMatch = splitOnMatch(book.title, trimmedQuery);
  const authorMatch = titleMatch ? null : splitOnMatch(book.author, trimmedQuery);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onSelect}
        className="flex-row items-center gap-3 px-[17px] py-3"
      >
        <SearchIcon size={20} />
        <View className="flex-1">
          <Text numberOfLines={1} className="font-aeonik-regular text-[16px] leading-[19px]">
            {titleMatch ? (
              <>
                <Text style={{ color: "#686868" }}>{titleMatch.before}</Text>
                <Text className="text-white">{titleMatch.match}</Text>
                <Text style={{ color: "#686868" }}>{titleMatch.after}</Text>
              </>
            ) : (
              <Text className="text-white">{book.title}</Text>
            )}
          </Text>
          {authorMatch && (
            <Text numberOfLines={1} className="mt-[2px] font-aeonik-regular text-[12px] leading-[15px]" style={{ color: "#8a8a8a" }}>
              by {authorMatch.before}
              <Text className="text-white">{authorMatch.match}</Text>
              {authorMatch.after}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      {showDivider && <View className="mx-[17px] h-px bg-[#2a2a2a]" />}
    </View>
  );
}

function ResultCard({ book, width, onPress }: { book: SearchableBook; width: number; onPress: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={{ width }} onPress={onPress}>
      <BookCover source={book.cover} width={width} height={width * 1.5} radius={6} />
      <Text numberOfLines={1} className="mt-2 font-aeonik-medium text-[12px] leading-[17px] text-white">
        {book.author}
      </Text>
    </TouchableOpacity>
  );
}

/**
 * Figma "Search result page" (nodes 6629:9398, 6629:9510, 6629:9585,
 * 6629:9716) — pushed from the explore/home search bar. Same top-level
 * pattern as app/downloads.tsx, app/favourites.tsx, app/history.tsx: not
 * part of the (tabs) group, so it wires its own bottom menu.
 */
export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [query, setQuery] = useState("");
  // The committed search term — null while the user is still typing/browsing
  // history, so results only replace the suggestion list once a search runs.
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);

  const historyQueries = useSearchHistoryStore((state) => state.queries);
  const addHistoryQuery = useSearchHistoryStore((state) => state.addQuery);
  const removeHistoryQuery = useSearchHistoryStore((state) => state.removeQuery);

  const suggestions = useMemo(() => (query.trim() ? searchBooks(query) : []), [query]);
  const results = useMemo(() => (submittedQuery ? searchBooks(submittedQuery) : []), [submittedQuery]);

  const commitSearch = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    setQuery(trimmed);
    setSubmittedQuery(trimmed);
    addHistoryQuery(trimmed);
    Keyboard.dismiss();
  };

  const handleChangeText = (text: string) => {
    setQuery(text);
    if (submittedQuery !== null) {
      setSubmittedQuery(null);
    }
  };

  const handleClearQuery = () => {
    setQuery("");
    setSubmittedQuery(null);
  };

  const showHistory = submittedQuery === null && query.trim().length === 0;
  const showSuggestions = submittedQuery === null && query.trim().length > 0;
  const showResults = submittedQuery !== null;

  const cardWidth = (width - 17 * 2 - 15 * 2) / 3;

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      {/* No slide animation — tapping the search bar/icon should feel like
          switching tabs (Home/Explore/Library swap in place instantly via
          the custom TabBar), not like pushing a new page. */}
      <Stack.Screen options={{ headerShown: false, animation: "none" }} />
      <StatusBar style="light" />

      {/* Box height matches glow-bg.png's own aspect ratio (650x432) so the
          image renders uncropped — the asset's gradient only finishes
          fading to black near its natural bottom edge, so cropping it
          (e.g. a 350x160 box) cuts it off mid-fade and leaves a hard seam
          against the solid background. */}
      <View pointerEvents="none" style={{ position: "absolute", left: 0, top: 0, width: 350, height: 233 }}>
        <Image source={images.exploreGlow} style={{ width: "100%", height: "100%" }} contentFit="contain" />
      </View>

      <View
        className="flex-row items-center gap-[10px] px-[17px]"
        style={{ paddingTop: insets.top + 16, paddingBottom: 8 }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={8}
          onPress={() => router.back()}
          className="size-9 items-center justify-center rounded-full bg-[rgba(255,255,255,0.08)]"
        >
          <BackIcon />
        </TouchableOpacity>

        <View className="h-[46px] flex-1 flex-row items-center gap-[10px] rounded-[14px] border border-[#333] bg-[#131313] px-[14px]">
          <SearchIcon />
          <TextInput
            value={query}
            onChangeText={handleChangeText}
            onSubmitEditing={() => commitSearch(query)}
            autoFocus
            returnKeyType="search"
            placeholder="Search by book title or author…"
            placeholderTextColor="#c8c7cc"
            className="flex-1 font-aeonik-regular text-[13px] text-white"
            style={{ paddingVertical: 0 }}
          />
          {query.length > 0 && (
            <TouchableOpacity activeOpacity={0.7} hitSlop={8} onPress={handleClearQuery}>
              <ClearIcon />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* flex: 1 so short content (e.g. a couple of history chips) still
          pushes the bottom menu down to the screen edge instead of leaving
          it stacked right under the content. */}
      <View style={{ flex: 1 }}>
        {showHistory && historyQueries.length > 0 && (
          <View>
            <Text className="mt-4 px-[17px] font-aeonik-medium text-[16px] leading-[17px] text-white">
              Search History
            </Text>
            <View className="mt-3">
              {historyQueries.map((historyQuery) => (
                <HistoryChip
                  key={historyQuery}
                  query={historyQuery}
                  onSelect={() => commitSearch(historyQuery)}
                  onRemove={() => removeHistoryQuery(historyQuery)}
                />
              ))}
            </View>
          </View>
        )}

        {showSuggestions && (
          <View className="mt-1">
            {suggestions.map((book, index) => (
              <SuggestionRow
                key={book.id}
                book={book}
                query={query}
                onSelect={() => commitSearch(book.title)}
                showDivider={index < suggestions.length - 1}
              />
            ))}
          </View>
        )}

        {showResults &&
          (results.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
              <Text className="mt-4 px-[17px] font-aeonik-medium text-[16px] leading-[17px] text-white">
                Top Results for {submittedQuery}
              </Text>
              <View className="mt-4 flex-row flex-wrap px-[17px]" style={{ columnGap: 15, rowGap: 24 }}>
                {results.map((book) => (
                  <ResultCard key={book.id} book={book} width={cardWidth} onPress={() => router.push({ pathname: "/book", params: { id: book.id } } as Href)} />
                ))}
              </View>
            </ScrollView>
          ) : (
            <View className="items-center" style={{ marginTop: 190 }}>
              <Text className="font-aeonik-medium text-[20px] leading-[17px] text-white">No Results Found</Text>
            </View>
          ))}
      </View>

      <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#000000" }}>
        <BottomMenu
          variant="black"
          active="explore"
          onSelect={(key) => {
            if (key === "home") {
              router.replace("/home");
            } else if (key === "explore") {
              router.replace("/explore");
            } else if (key === "library") {
              router.replace("/library");
            }
          }}
        />
      </SafeAreaView>
    </View>
  );
}
