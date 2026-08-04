import { colors } from "@/constants/theme";
import { images } from "@/constants/images";
import { useClerk, useUser } from "@clerk/expo";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

function BackIcon() {
  return (
    <Svg width={16.5} height={14} viewBox="0 0 16.5 14" fill="none">
      <Path
        d="M0.75 7H15.75M7 13.25L0.75 7L7 0.75"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function MailIcon() {
  return (
    <Svg width={21.5} height={17} viewBox="0 0 21.5 17" fill="none">
      <Path
        d="M15.875 16.5H5.625C2.55 16.5 0.5 15.0882 0.5 11.7941V5.20588C0.5 1.91176 2.55 0.5 5.625 0.5H15.875C18.95 0.5 21 1.91176 21 5.20588V11.7941C21 15.0882 18.95 16.5 15.875 16.5Z"
        stroke="#F2F2F7"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.6901 4.51758L12.0044 8.55174C11.2661 9.07551 10.2358 9.07551 9.4975 8.55174L3.8118 4.51758"
        stroke="#F2F2F7"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function CheckIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path d="M10 3L4.5 8.5L2 6" stroke="#59B87A" strokeWidth={1.68} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Figma "Group 788" — small trash icon next to the "Delete Account" link. */
function TrashLinkIcon() {
  return (
    <Svg width={14.5} height={15} viewBox="0 0 14.5 15" fill="none">
      <Path d="M14 3.19238H0.5" stroke={colors.primary} strokeLinecap="round" />
      <Path
        d="M5 2.11538C5.32752 1.17427 6.21122 0.5 7.24998 0.5C8.28882 0.5 9.17251 1.17427 9.5 2.11538"
        stroke={colors.primary}
        strokeLinecap="round"
      />
      <Path
        d="M12.1474 10.3985C12.0114 12.3427 11.9434 13.3148 11.2788 13.9074C10.6143 14.5 9.59213 14.5 7.54785 14.5H6.95365C4.90938 14.5 3.88724 14.5 3.22266 13.9074C2.55808 13.3148 2.49008 12.3427 2.3541 10.3985L2.00073 5.34619M12.5007 5.34619L12.3471 7.54311"
        stroke={colors.primary}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** Figma "Group 789" — larger trash icon inside the delete-confirmation warning badge. */
function TrashBadgeIcon() {
  return (
    <Svg width={26.75} height={28} viewBox="0 0 26.75 28" fill="none">
      <Path d="M25.75 6H1" stroke={colors.primary} strokeWidth={2} strokeLinecap="round" />
      <Path
        d="M9.25 3.99999C9.85045 2.25221 11.4706 1 13.375 1C15.2795 1 16.8996 2.25221 17.5 3.99999"
        stroke={colors.primary}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M22.3522 19.3827C22.1029 22.9934 21.9782 24.7988 20.7599 25.8993C19.5415 26.9999 17.6676 26.9999 13.9197 26.9999H12.8304C9.08252 26.9999 7.2086 26.9999 5.9902 25.8993C4.7718 24.7988 4.64714 22.9934 4.39784 19.3827L3.75 10M23 10L22.7183 14.08"
        stroke={colors.primary}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** Figma "Modal / Delete Account" (node 6621:8211), shown as a confirmation
 * before permanently deleting the signed-in Clerk user. */
function DeleteAccountModal({
  visible,
  email,
  isDeleting,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  email: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable
        onPress={isDeleting ? undefined : onCancel}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.62)",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 32,
        }}
      >
        {/* Swallow taps on the card itself so they don't bubble to the
            backdrop Pressable and dismiss the dialog. */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="w-full items-center gap-[16px] rounded-[20px] border border-[#333] bg-[#1c1717] px-6 pb-5 pt-[26px]"
        >
          <View className="size-[56px] items-center justify-center rounded-full bg-[#471717]">
            <TrashBadgeIcon />
          </View>

          <View className="w-full items-center gap-2">
            <Text className="text-center font-aeonik-bold text-[18px] leading-[25px] text-white">
              Delete your account?
            </Text>
            <Text className="text-center font-aeonik-regular text-[12.5px] leading-[18px] text-[#c8c7cc]">
              This permanently deletes your account, listening history, saved titles, downloads and active
              subscription. This cannot be undone.
            </Text>
          </View>

          <View className="w-full rounded-[12px] bg-[#161616] px-[13px] py-[10px]">
            <Text numberOfLines={1} className="text-center font-aeonik-bold text-[12px] leading-[17px] text-white">
              {email}
            </Text>
          </View>

          <View className="w-full flex-row gap-[10px]">
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={isDeleting}
              onPress={onCancel}
              className="flex-1 items-center justify-center rounded-[12px] border border-[#333] bg-[#161616] py-[12px]"
            >
              <Text className="font-aeonik-bold text-[13px] leading-[18px] text-white">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={isDeleting}
              onPress={onConfirm}
              style={{ opacity: isDeleting ? 0.6 : 1 }}
              className="flex-1 items-center justify-center rounded-[12px] bg-primary py-[12px]"
            >
              <Text className="font-aeonik-bold text-[13px] leading-[18px] text-white">
                {isDeleting ? "Deleting…" : "Delete"}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/**
 * Figma "Account" (node 6621:7946) + "Account / 02 — Delete Account
 * (Confirmation)" (node 6621:8125) — pushed from the Settings screen's
 * "Account" row (app/(tabs)/profile.tsx), not part of the (tabs) group, so
 * it wires its own back button. No bottom menu — this is a detail screen,
 * back button returns to the profile tab.
 */
export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const isVerified = user?.primaryEmailAddress?.verification?.status === "verified";

  const handleDeleteAccount = async () => {
    if (!user || isDeleting) {
      return;
    }
    setIsDeleting(true);
    try {
      await user.delete();
    } catch {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      Alert.alert("Couldn't delete account", "Please try again, or contact support if the problem continues.");
      return;
    }
    await signOut().catch(() => {});
    router.replace("/");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 24 }}>
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
              className="size-[30px] items-center justify-center"
            >
              <BackIcon />
            </TouchableOpacity>

            <View className="mt-[14px] gap-2">
              <Text className="font-aeonik-bold text-[30px] leading-[39px] tracking-[-0.5px] text-white">Account</Text>
              <View className="h-1 w-[46px] rounded-full bg-primary" />
            </View>
          </View>
        </View>

        <View className="px-5 pt-[22px]">
          <View className="w-full flex-row items-center gap-[14px] rounded-[16px] border border-[#333] bg-[#161616] p-4">
            <View className="size-[46px] items-center justify-center rounded-[13px] bg-[rgba(255,255,255,0.14)]">
              <MailIcon />
            </View>
            <View className="flex-1 gap-[6px]">
              <Text numberOfLines={1} className="font-aeonik-bold text-[14.5px] leading-[19px] text-white">
                {email}
              </Text>
              {isVerified ? (
                <View className="flex-row items-center gap-[5px]">
                  <CheckIcon />
                  <Text className="font-aeonik-bold text-[11px] leading-[14px]" style={{ color: "#59b87a" }}>
                    Verified
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <Text className="mt-[10px] font-aeonik-regular text-[11.5px] leading-[18px] text-[#c8c7cc]">
            This is the email used to sign in and receive notifications from Shuno FM.
          </Text>
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowDeleteConfirm(true)}
          className="flex-row items-center justify-center gap-[9px] px-5 pb-6"
        >
          <TrashLinkIcon />
          <Text className="font-aeonik-medium text-[13.5px] leading-[18px]" style={{ color: colors.primary }}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <DeleteAccountModal
        visible={showDeleteConfirm}
        email={email}
        isDeleting={isDeleting}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAccount}
      />
    </View>
  );
}
