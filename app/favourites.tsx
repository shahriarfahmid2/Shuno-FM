import { BookCover } from "@/components/BookCover";
import { colors } from "@/constants/theme";
import { images } from "@/constants/images";
import { FavouriteEntry, favouriteEntries } from "@/data/favourites";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

function HeartIcon() {
  return (
    <Svg width={23} height={20} viewBox="0 0 23 20" fill="none">
      <Path
        d="M2.47019 10.1895C1.32826 5.47907 5.5091 1.19763 10.2454 2.22725C11.0739 2.40738 11.9332 2.42466 12.7686 2.27937C17.5689 1.44453 21.6703 5.81896 20.4885 10.5459L20.0744 12.2024C19.4183 14.8268 17.3088 16.8382 14.6562 17.3688L12.8728 17.7254C11.9666 17.9067 11.0334 17.9067 10.1272 17.7254L8.37821 17.3756C5.70788 16.8416 3.58965 14.8073 2.94807 12.1608L2.47019 10.1895Z"
        fill={colors.primary}
      />
      <Path
        d="M20.4243 3.11183C19.8496 2.44937 19.1278 1.91658 18.3109 1.55186C17.494 1.18714 16.6024 0.99956 15.7002 1.00264C14.1566 0.958112 12.6538 1.47887 11.501 2.45777C10.3482 1.47887 8.84534 0.958112 7.30174 1.00264C6.39958 0.99956 5.50794 1.18714 4.69105 1.55186C3.87415 1.91658 3.15234 2.44937 2.5776 3.11183C1.57714 4.26794 0.530477 6.36114 1.2244 9.77245C2.33195 15.22 10.637 19.6904 10.9876 19.8734C11.1439 19.9564 11.3199 20 11.4989 20C11.6778 20 11.8538 19.9564 12.0101 19.8734C12.3629 19.6864 20.6679 15.216 21.7733 9.77245C22.4715 6.36114 21.4248 4.26794 20.4243 3.11183ZM19.7168 9.39242C18.9336 13.2438 13.2416 16.8261 11.501 17.8442C9.04862 16.4341 4.00324 12.8937 3.29042 9.39242C2.75187 6.74617 3.48884 5.20903 4.20271 4.38495C4.58022 3.95102 5.05387 3.60206 5.58967 3.3631C6.12547 3.12414 6.71014 3.00111 7.30174 3.00282C7.93361 2.95768 8.56698 3.06928 9.14009 3.32676C9.71321 3.58423 10.2065 3.97879 10.5719 4.47196C10.662 4.62991 10.7949 4.76195 10.9568 4.85431C11.1187 4.94668 11.3036 4.99599 11.4923 4.99712C11.681 4.99824 11.8666 4.95113 12.0297 4.8607C12.1927 4.77027 12.3274 4.63982 12.4196 4.48296C12.7842 3.98595 13.2786 3.58806 13.8539 3.3285C14.4292 3.06895 15.0655 2.9567 15.7002 3.00282C16.293 3.00007 16.8792 3.12261 17.4163 3.36161C17.9535 3.6006 18.4283 3.95011 18.8066 4.38495C19.5184 5.20903 20.2553 6.74617 19.7168 9.39242Z"
        fill={colors.primary}
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

function FavouriteRow({ entry, onPressHeart }: { entry: FavouriteEntry; onPressHeart: () => void }) {
  return (
    <View className="w-full flex-row items-center gap-[13px] px-5 py-[14px]">
      <BookCover source={entry.cover} width={64} height={96} radius={6} style={{ borderColor: "#3d3d3d" }} />
      <View className="flex-1 gap-[5px]">
        <Text numberOfLines={1} className="font-aeonik-bold text-[14.5px] leading-[19px] text-white">
          {entry.title}
        </Text>
        <Text numberOfLines={1} className="font-aeonik-regular text-[12px] leading-[16px] text-[#c8c7cc]">
          {entry.author}
        </Text>
        <View className="self-start rounded-[8px] bg-[rgba(224,66,66,0.18)] px-[9px] py-[5px]">
          <Text className="font-aeonik-bold text-[10.5px] leading-[14px]" style={{ color: colors.primary }}>
            {entry.category}
          </Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} hitSlop={10} onPress={onPressHeart}>
        <HeartIcon />
      </TouchableOpacity>
    </View>
  );
}

/** Confirmation dialog shown before a book is removed from Favourites. */
function RemoveFavouriteModal({
  entry,
  onCancel,
  onConfirm,
}: {
  entry: FavouriteEntry | null;
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
            আপনি কি এই বইটি Favourite লিস্ট থেকে রিমুভ করতে চান?
          </Text>
          <Text className="mt-[14px] text-center font-kalpurush text-[13px] leading-[18px] text-[#c8c7cc]">
            {entry ? `"${entry.title}" আপনার Favourite লিস্ট থেকে রিমুভ হয়ে যাবে` : ""}
          </Text>

          <View className="mt-[14px] flex-row gap-3">
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
 * Figma "Favourites page" (node 6608:5633) — pushed from the library
 * screen's Favourites link, not part of the (tabs) group, so it wires its
 * own top/bottom safe-area insets. No bottom menu — this is a detail
 * screen, back button returns to the library tab.
 */
export default function FavouritesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [entries, setEntries] = useState<FavouriteEntry[]>(favouriteEntries);
  const [pendingRemoval, setPendingRemoval] = useState<FavouriteEntry | null>(null);

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
              the library and history screens' header glow. */}
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
              Favourites
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
              <FavouriteRow entry={entry} onPressHeart={() => setPendingRemoval(entry)} />
              {index < entries.length - 1 && <View className="h-px w-full bg-[#38383b]" />}
            </View>
          ))}
        </View>
      </ScrollView>

      <RemoveFavouriteModal
        entry={pendingRemoval}
        onCancel={() => setPendingRemoval(null)}
        onConfirm={handleConfirmRemove}
      />
    </View>
  );
}
