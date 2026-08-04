import { BottomMenu } from "@/components/BottomMenu";
import { images } from "@/constants/images";
import { AuthorListItem, searchAuthors } from "@/data/author";
import { splitOnMatch } from "@/lib/text";
import { useAuthorSearchHistoryStore } from "@/store/useAuthorSearchHistoryStore";
import { Image } from "expo-image";
import { Href, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

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
 * Figma "Home Page (Black)" (node 6646:4662) — the matched-author box shown
 * once a search matches. Reused for both the live-as-you-type preview and
 * the committed results list, since the design's box IS the result.
 *
 * `query` highlights the matched substring of the name in white, the rest
 * in grey — same treatment as app/search.tsx's SuggestionRow, so partial
 * input (e.g. "Robe") visibly explains why this author matched. Corner
 * radius is a notch bigger than the Figma spec's 7px to match the rounder
 * 14px card language used elsewhere in the app (search input, AuthorCardView).
 */
function AuthorResultRow({
  author,
  query,
  onPress,
}: {
  author: AuthorListItem;
  query: string;
  onPress: () => void;
}) {
  const nameMatch = splitOnMatch(author.name, query.trim());

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="mx-[17px] mb-3 flex-row items-center gap-[13px] rounded-[14px] border border-[#4d4d4d] p-4"
    >
      <View className="size-[70px] overflow-hidden rounded-full bg-white">
        <Image
          source={author.avatar}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          contentPosition={author.avatarPosition}
        />
      </View>
      <View className="flex-1 gap-[7px]">
        <Text numberOfLines={1} className="font-aeonik-bold text-[18px] leading-[22px]">
          {nameMatch ? (
            <>
              <Text style={{ color: "#686868" }}>{nameMatch.before}</Text>
              <Text className="text-white">{nameMatch.match}</Text>
              <Text style={{ color: "#686868" }}>{nameMatch.after}</Text>
            </>
          ) : (
            <Text className="text-white">{author.name}</Text>
          )}
        </Text>
        <Text numberOfLines={1} className="font-kalpurush text-[14px] leading-[16px] text-[#9c9ca8]">
          {author.tagsLabel}
        </Text>
        <Text className="font-kalpurush text-[14px] leading-[16px] text-[#59b87a]">বই সংখ্যা : {author.bookCount}</Text>
      </View>
      <ChevronRightIcon />
    </TouchableOpacity>
  );
}

/**
 * Figma "Home Page (Black)" (node 6646:4662) — author-only search, pushed
 * from the search bar on app/authors.tsx. Mirrors app/search.tsx's
 * history/preview/results pattern, but matches are rendered as the full
 * author box from Figma at every stage (including the as-you-type preview,
 * before the search is submitted) instead of a plain text suggestion row —
 * the box IS the match here, so showing it early is the point.
 */
export default function AuthorSearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [query, setQuery] = useState("");
  // The committed search term — null while the user is still typing/browsing
  // history, so results only replace the live preview once a search runs.
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);

  const historyQueries = useAuthorSearchHistoryStore((state) => state.queries);
  const addHistoryQuery = useAuthorSearchHistoryStore((state) => state.addQuery);
  const removeHistoryQuery = useAuthorSearchHistoryStore((state) => state.removeQuery);

  const previewResults = useMemo(() => (query.trim() ? searchAuthors(query) : []), [query]);
  const results = useMemo(() => (submittedQuery ? searchAuthors(submittedQuery) : []), [submittedQuery]);

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

  const goToAuthor = (author: AuthorListItem) => {
    addHistoryQuery(author.name);
    Keyboard.dismiss();
    router.push({ pathname: "/author", params: { id: author.id } } as Href);
  };

  const showHistory = submittedQuery === null && query.trim().length === 0;
  const showPreview = submittedQuery === null && query.trim().length > 0;
  const showResults = submittedQuery !== null;

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      {/* No slide animation — tapping the search bar should feel like an
          instant tab swap, same treatment as app/search.tsx. */}
      <Stack.Screen options={{ headerShown: false, animation: "none" }} />
      <StatusBar style="light" />

      {/* Same glow asset/position as app/author.tsx — this page's Figma
          ellipse (node 6646:4797) shares the exact same size/position. */}
      <View pointerEvents="none" style={{ position: "absolute", left: -242, top: -113, width: 467, height: 229 }}>
        <Image source={images.authorGlow} style={{ width: "100%", height: "100%" }} contentFit="cover" />
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
            placeholder="Search by author name"
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

        {showPreview && previewResults.length > 0 && (
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View className="mt-4">
              {previewResults.map((item) => (
                <AuthorResultRow key={item.id} author={item} query={query} onPress={() => goToAuthor(item)} />
              ))}
            </View>
          </ScrollView>
        )}

        {showResults &&
          (results.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 24 }}
            >
              <Text className="mt-4 px-[17px] font-aeonik-medium text-[16px] leading-[17px] text-white">
                Top Results for “<Text className="font-aeonik-bold">{submittedQuery}</Text>”
              </Text>
              <View className="mt-4">
                {results.map((item) => (
                  <AuthorResultRow
                    key={item.id}
                    author={item}
                    query={submittedQuery ?? ""}
                    onPress={() => goToAuthor(item)}
                  />
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
