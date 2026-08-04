import { BookCover } from "@/components/BookCover";
import { colors } from "@/constants/theme";
import { images } from "@/constants/images";
import { DownloadEntry, downloadEntries } from "@/data/downloads";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

function CheckIcon() {
  return (
    <Svg width={11} height={11} viewBox="0 0 11 11" fill="none">
      <Path
        d="M2 5.7L4.2 8L9 3"
        stroke="white"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function TrashIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M3.5 5.5H16.5" stroke={colors.primary} strokeWidth={1.5} strokeLinecap="round" />
      <Path
        d="M8 5.5V3.5C8 3.22386 8.22386 3 8.5 3H11.5C11.7761 3 12 3.22386 12 3.5V5.5"
        stroke={colors.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.5 5.5L6.16667 16C6.20605 16.6203 6.71743 17.1 7.33887 17.1H12.6611C13.2826 17.1 13.7939 16.6203 13.8333 16L14.5 5.5"
        stroke={colors.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M8.25 8.5V13.5" stroke={colors.primary} strokeWidth={1.3} strokeLinecap="round" />
      <Path d="M11.75 8.5V13.5" stroke={colors.primary} strokeWidth={1.3} strokeLinecap="round" />
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

function DownloadRow({ entry, onPressDelete }: { entry: DownloadEntry; onPressDelete: () => void }) {
  const isDownloading = entry.status === "downloading";
  const progressPercent = Math.round((entry.progress ?? 0) * 100);

  return (
    <View className="w-full flex-row items-center gap-[13px] px-5 py-[14px]">
      <BookCover source={entry.cover} width={64} height={96} radius={6} style={{ borderColor: "#3d3d3d" }} />
      <View className="flex-1">
        <Text numberOfLines={1} className="font-aeonik-bold text-[14.5px] leading-[19px] text-white">
          {entry.title}
        </Text>
        <Text
          numberOfLines={1}
          className="font-aeonik-regular text-[12px] leading-[16px] text-[#c8c7cc]"
          style={{ marginTop: isDownloading ? 8 : 5 }}
        >
          {entry.author}
        </Text>

        {isDownloading ? (
          <>
            <Text
              className="font-aeonik-bold text-[10.5px] leading-[14px]"
              style={{ color: colors.primary, marginTop: 12 }}
            >
              {progressPercent}% downloading
            </Text>
            <View className="mt-[5px] h-1 w-full overflow-hidden rounded-[20px] bg-[#404042]">
              <View
                className="h-1 rounded-[20px]"
                style={{ width: `${progressPercent}%`, backgroundColor: colors.primary }}
              />
            </View>
          </>
        ) : (
          <View
            className="mt-[5px] flex-row items-center gap-[5px] self-start rounded-[8px] py-1 pl-2 pr-[9px]"
            style={{ backgroundColor: colors.primary }}
          >
            <CheckIcon />
            <Text className="font-aeonik-bold text-[10px] leading-[13px] text-white">{entry.sizeLabel}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity activeOpacity={0.7} hitSlop={8} onPress={onPressDelete}>
        <TrashIcon />
      </TouchableOpacity>
    </View>
  );
}

/** Confirmation dialog shown before a book is removed from Downloads. */
function RemoveDownloadModal({
  entry,
  onCancel,
  onConfirm,
}: {
  entry: DownloadEntry | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal visible={entry !== null} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable
        onPress={onCancel}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 32,
        }}
      >
        {/* Swallow taps on the card itself so they don't bubble to the
            backdrop Pressable and dismiss the dialog. */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="w-full rounded-[20px] border border-[#2c2c2c] bg-[#161616] px-6 py-6"
        >
          <Text className="text-center font-li-ador-semibold text-[17px] leading-[22px] text-white">
            আপনি কি এই বইটি Download লিস্ট থেকে রিমুভ করতে চান?
          </Text>
          <Text className="mt-4 text-center font-kalpurush text-[13px] leading-[18px] text-[#c8c7cc]">
            {entry
              ? `"${entry.title}" আপনার Download লিস্ট থেকে রিমুভ হয়ে যাবে, অফলাইনে এই বইটি আর শুনতে পারবেন না`
              : ""}
          </Text>

          <View className="mt-4 flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onCancel}
              className="h-[46px] flex-1 items-center justify-center rounded-full border border-[#424242]"
            >
              <Text className="font-li-ador-semibold text-[14px] text-white">না</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onConfirm}
              className="h-[46px] flex-1 items-center justify-center rounded-full bg-primary"
            >
              <Text className="font-li-ador-semibold text-[14px] text-white">হ্যা</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/**
 * Figma "Downloads page" (node 6608:5858) — pushed from the library screen's
 * Downloads link, not part of the (tabs) group, so it wires its own
 * top/bottom safe-area insets. No bottom menu — this is a detail screen,
 * back button returns to the library tab.
 */
export default function DownloadsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [entries, setEntries] = useState<DownloadEntry[]>(downloadEntries);
  const [pendingRemoval, setPendingRemoval] = useState<DownloadEntry | null>(null);

  const handleConfirmRemove = () => {
    if (!pendingRemoval) {
      return;
    }
    setEntries((current) => current.filter((entry) => entry.id !== pendingRemoval.id));
    setPendingRemoval(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        <View>
          {/* Glow bleeds up behind the status bar, same asset/technique as
              the library and favourites screens' header glow. */}
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
              Downloads
            </Text>
            <View className="mt-2 h-1 w-[46px] rounded-full bg-primary" />
          </View>
        </View>

        <Text className="mt-[18px] px-5 pb-4 font-aeonik-regular text-[16px] leading-[17px] text-[#c8c7cc]">
          {entries.length} Titles
        </Text>

        <View>
          {entries.map((entry, index) => (
            <View key={entry.id}>
              <DownloadRow entry={entry} onPressDelete={() => setPendingRemoval(entry)} />
              {index < entries.length - 1 && <View className="h-px w-full bg-[#38383b]" />}
            </View>
          ))}
        </View>
      </ScrollView>

      <RemoveDownloadModal
        entry={pendingRemoval}
        onCancel={() => setPendingRemoval(null)}
        onConfirm={handleConfirmRemove}
      />
    </View>
  );
}
