import { images } from "@/constants/images";
import { mockProfile, profileStats, type ProfileStat } from "@/data/profile";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

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

/** Figma "Stat Card" (e.g. node 6621:7869). */
function StatCard({ stat }: { stat: ProfileStat }) {
  return (
    <View className="flex-1 items-center gap-[2px] rounded-[14px] border border-[#333] bg-[#161616] py-[14px]">
      <Text className="font-aeonik-bold text-[18px] leading-[23px] tracking-[-0.3px] text-white">{stat.value}</Text>
      <Text className="font-aeonik-medium text-[10.5px] leading-[13px] text-[#8c878c]">{stat.label}</Text>
    </View>
  );
}

/**
 * Figma "Profile Page" (node 6621:7759) — pushed from the Settings
 * screen's "Profile" row (app/(tabs)/profile.tsx), not part of the (tabs)
 * group, so it wires its own back button and safe-area insets (same
 * pattern as app/history.tsx and app/favourites.tsx).
 */
export default function MyProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [firstName, setFirstName] = useState(mockProfile.firstName);
  const [lastName, setLastName] = useState(mockProfile.lastName);

  return (
    <SafeAreaView edges={[]} style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View>
          {/* Glow bleeds up behind the status bar, same asset/technique as
              the Settings screen's header glow (app/(tabs)/profile.tsx). */}
          <View pointerEvents="none" style={{ position: "absolute", left: -242, top: -113, width: 796, height: 229 }}>
            <Image source={images.settingsGlow} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          </View>

          <View className="px-5" style={{ paddingTop: insets.top + 16 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={8}
              onPress={() => router.back()}
              className="size-9 items-center justify-center rounded-full bg-[rgba(255,255,255,0.08)]"
            >
              <BackIcon />
            </TouchableOpacity>
          </View>
        </View>

        <View className="items-center gap-[12px] px-8 pt-[6px]">
          <View className="size-[100px] items-center justify-center overflow-hidden rounded-full bg-[rgba(224,66,66,0.16)]">
            <Image source={mockProfile.avatar} style={{ width: 101, height: 122 }} contentFit="cover" />
          </View>
          <View className="w-full items-center gap-[8px]">
            <Text className="w-full text-center font-aeonik-bold text-[23px] leading-[29px] tracking-[-0.2px] text-white">
              {mockProfile.firstName} {mockProfile.lastName}
            </Text>
            <Text className="w-full text-center font-aeonik-regular text-[14px] leading-[18px] text-[#c8c7cc]">
              {mockProfile.email}
            </Text>
            <Text className="w-full text-center font-aeonik-regular text-[12.5px] leading-4 text-[#8c878c]">
              {mockProfile.memberSince}
            </Text>
          </View>
        </View>

        <View className="flex-row gap-[10px] px-5 pt-[24px]">
          {profileStats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </View>

        <View className="flex-row gap-3 px-5 pt-[35px]">
          <View className="flex-1 gap-[10px]">
            <Text className="font-aeonik-medium text-[13px] leading-[16px] text-[#8c878c]">First Name</Text>
            <View className="h-[46px] rounded-[10px] border border-[#5c5c5c] bg-black">
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First name"
                placeholderTextColor="#5c5c5c"
                className="flex-1 font-aeonik-regular text-[14px] text-white"
                style={{
                  height: "100%",
                  paddingHorizontal: 16,
                  paddingVertical: 0,
                  includeFontPadding: false,
                  textAlignVertical: "center",
                }}
              />
            </View>
          </View>
          <View className="flex-1 gap-[10px]">
            <Text className="font-aeonik-medium text-[13px] leading-[16px] text-[#8c878c]">Last Name</Text>
            <View className="h-[46px] rounded-[10px] border border-[#5c5c5c] bg-black">
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last name"
                placeholderTextColor="#5c5c5c"
                className="flex-1 font-aeonik-regular text-[14px] text-white"
                style={{
                  height: "100%",
                  paddingHorizontal: 16,
                  paddingVertical: 0,
                  includeFontPadding: false,
                  textAlignVertical: "center",
                }}
              />
            </View>
          </View>
        </View>

        <View className="px-5 pt-[20px]">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.back()}
            className="h-[46px] w-full items-center justify-center rounded-[18px] bg-primary"
          >
            <Text className="font-aeonik-bold text-[16px] text-white">Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
