import { BookCover } from "@/components/BookCover";
import { colors } from "@/constants/theme";
import { images } from "@/constants/images";
import { HistoryEntry, historyEntries } from "@/data/history";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

function ClockIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path
        d="M6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5Z"
        stroke={colors.primary}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 3.5V6L7.5 7"
        stroke={colors.primary}
        strokeWidth={1.4}
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

const finishedGreen = "#34C759";

function HistoryRow({ entry }: { entry: HistoryEntry }) {
  const isFinished = entry.status === "finished";

  return (
    <TouchableOpacity activeOpacity={0.7} className="w-full flex-row items-center gap-[13px] px-5 py-[14px]">
      <BookCover source={entry.cover} width={64} height={96} radius={6} style={{ borderColor: "#3d3d3d" }} />
      <View className="flex-1">
        <Text numberOfLines={1} className="font-aeonik-bold text-[14.5px] leading-[19px] text-white">
          {entry.title}
        </Text>
        <Text
          numberOfLines={1}
          className="font-aeonik-regular text-[12px] leading-[16px] text-[#c8c7cc]"
          style={{ marginTop: 8 }}
        >
          {entry.author}
        </Text>
        <View className="flex-row items-center gap-[6px]" style={{ marginTop: 12 }}>
          {isFinished ? (
            <Text className="font-aeonik-bold text-[10.5px] leading-[14px]" style={{ color: finishedGreen }}>
              Finished
            </Text>
          ) : (
            <>
              <ClockIcon />
              <Text className="font-aeonik-bold text-[10.5px] leading-[14px]" style={{ color: colors.primary }}>
                {entry.minutesLeft} min left
              </Text>
            </>
          )}
        </View>
        <View className="mt-[5px] h-1 w-full overflow-hidden rounded-[20px] bg-[#404042]">
          <View
            className="h-1 rounded-[20px]"
            style={{ width: `${entry.progress * 100}%`, backgroundColor: isFinished ? finishedGreen : colors.primary }}
          />
        </View>
      </View>
      <ChevronRightIcon />
    </TouchableOpacity>
  );
}

type HistoryTab = "in-progress" | "finished";

/**
 * Figma "My History page" (node 6607:5234) — pushed from the library
 * screen's "My History" link, not part of the (tabs) group, so it wires
 * its own top/bottom safe-area insets. No bottom menu — this is a detail
 * screen, back button returns to the library tab.
 */
export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [tab, setTab] = useState<HistoryTab>("in-progress");

  const finishedCount = historyEntries.filter((entry) => entry.status === "finished").length;
  const visibleEntries = historyEntries.filter((entry) => entry.status === tab);

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        <View>
          {/* Glow bleeds up behind the status bar, same asset/technique as
              the library screen's header glow (app/(tabs)/library.tsx). */}
          <View
            pointerEvents="none"
            style={{ position: "absolute", left: -242, top: -113, width: 796, height: 229 }}
          >
            <Image source={images.libraryGlow} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          </View>

          <View className="px-5" style={{ paddingTop: insets.top + 16 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={8}
              onPress={() => router.back()}
              className="mb-4 size-9 items-center justify-center rounded-full bg-[rgba(255,255,255,0.08)]"
            >
              <BackIcon />
            </TouchableOpacity>
            <Text className="font-aeonik-bold text-[26px] leading-[34px] tracking-[-0.4px] text-white">
              My History
            </Text>
            <View className="mt-2 h-1 w-[46px] rounded-full bg-primary" />
          </View>
        </View>

        <View className="mt-[18px] flex-row gap-[10px] px-5 pb-4">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setTab("in-progress")}
            className={
              tab === "in-progress"
                ? "rounded-[20px] bg-white px-[18px] py-[10px]"
                : "rounded-[20px] bg-[#161616] px-[18px] py-[10px]"
            }
          >
            <Text
              className="font-aeonik-bold text-[12.5px] leading-[16px]"
              style={{ color: tab === "in-progress" ? "#140808" : "#c8c7cc" }}
            >
              In progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setTab("finished")}
            className={
              tab === "finished"
                ? "rounded-[20px] bg-white px-[18px] py-[10px]"
                : "rounded-[20px] bg-[#161616] px-[18px] py-[10px]"
            }
          >
            <Text
              className="font-aeonik-bold text-[12.5px] leading-[16px]"
              style={{ color: tab === "finished" ? "#140808" : "#c8c7cc" }}
            >
              Finished ({finishedCount})
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {visibleEntries.map((entry, index) => (
            <View key={entry.id}>
              <HistoryRow entry={entry} />
              {index < visibleEntries.length - 1 && <View className="h-px w-full bg-[#38383b]" />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
