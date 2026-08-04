import { colors } from "@/constants/theme";
import { images } from "@/constants/images";
import { accountRows, supportRows, type SettingsRow, type SettingsRowIcon } from "@/data/settings";
import { getPlan, getRenewalLabel } from "@/data/subscription";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { useClerk } from "@clerk/expo";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

function ChevronRightIcon({ size = 16, color = "#808085", strokeWidth = 1.86667 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path d="M6 12L10 8L6 4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function CrownIcon({ size = 20, strokeWidth = 1 }: { size?: number; strokeWidth?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M1.66667 15L3.33333 5.83333L7.5 10L10 4.16667L12.5 10L16.6667 5.83333L18.3333 15H1.66667Z"
        stroke="white"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M3.33333 17.5H16.6667" stroke="white" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function UserIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 10C11.8409 10 13.3333 8.50762 13.3333 6.66667C13.3333 4.82572 11.8409 3.33333 10 3.33333C8.15905 3.33333 6.66667 4.82572 6.66667 6.66667C6.66667 8.50762 8.15905 10 10 10Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.33333 17.5C3.33333 13.8333 6.33333 10.8333 10 10.8333C13.6667 10.8333 16.6667 13.8333 16.6667 17.5"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Figma "Menu/Settings" (node 6608:6313) — flattened export, exact path. */
function SettingsGearIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path
        d="M11.0006 13.1512C12.1886 13.1512 13.1517 12.1881 13.1517 11.0002C13.1517 9.81217 12.1886 8.84912 11.0006 8.84912C9.81266 8.84912 8.84961 9.81217 8.84961 11.0002C8.84961 12.1881 9.81266 13.1512 11.0006 13.1512Z"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.55 13.25C16.4502 13.4762 16.4204 13.7271 16.4645 13.9704C16.5086 14.2137 16.6246 14.4382 16.7975 14.615L16.8425 14.66C16.982 14.7993 17.0926 14.9647 17.1681 15.1468C17.2436 15.3289 17.2824 15.5241 17.2824 15.7213C17.2824 15.9184 17.2436 16.1136 17.1681 16.2957C17.0926 16.4778 16.982 16.6432 16.8425 16.7825C16.7032 16.922 16.5378 17.0326 16.3557 17.1081C16.1736 17.1836 15.9784 17.2224 15.7812 17.2224C15.5841 17.2224 15.3889 17.1836 15.2068 17.1081C15.0247 17.0326 14.8593 16.922 14.72 16.7825L14.675 16.7375C14.4982 16.5646 14.2737 16.4486 14.0304 16.4045C13.7871 16.3604 13.5362 16.3902 13.31 16.49C13.0882 16.5851 12.899 16.7429 12.7657 16.9442C12.6325 17.1454 12.561 17.3812 12.56 17.6225V17.75C12.56 18.1478 12.402 18.5294 12.1207 18.8107C11.8394 19.092 11.4578 19.25 11.06 19.25C10.6622 19.25 10.2806 19.092 9.99934 18.8107C9.71804 18.5294 9.56 18.1478 9.56 17.75V17.6825C9.55419 17.4343 9.47384 17.1935 9.32938 16.9915C9.18493 16.7896 8.98305 16.6357 8.75 16.55C8.52379 16.4502 8.27286 16.4204 8.02956 16.4645C7.78626 16.5086 7.56176 16.6246 7.385 16.7975L7.34 16.8425C7.20069 16.982 7.03526 17.0926 6.85316 17.1681C6.67106 17.2436 6.47587 17.2824 6.27875 17.2824C6.08163 17.2824 5.88644 17.2436 5.70434 17.1681C5.52224 17.0926 5.35681 16.982 5.2175 16.8425C5.07804 16.7032 4.9674 16.5378 4.89191 16.3557C4.81642 16.1736 4.77757 15.9784 4.77757 15.7812C4.77757 15.5841 4.81642 15.3889 4.89191 15.2068C4.9674 15.0247 5.07804 14.8593 5.2175 14.72L5.2625 14.675C5.4354 14.4982 5.55139 14.2737 5.5955 14.0304C5.63962 13.7871 5.60984 13.5362 5.51 13.31C5.41493 13.0882 5.25707 12.899 5.05585 12.7657C4.85463 12.6325 4.61884 12.561 4.3775 12.56H4.25C3.85218 12.56 3.47064 12.402 3.18934 12.1207C2.90804 11.8394 2.75 11.4578 2.75 11.06C2.75 10.6622 2.90804 10.2806 3.18934 9.99934C3.47064 9.71804 3.85218 9.56 4.25 9.56H4.3175C4.56575 9.55419 4.8065 9.47384 5.00847 9.32938C5.21045 9.18493 5.36429 8.98305 5.45 8.75C5.54984 8.52379 5.57962 8.27286 5.5355 8.02956C5.49139 7.78626 5.3754 7.56176 5.2025 7.385L5.1575 7.34C5.01804 7.20069 4.9074 7.03526 4.83191 6.85316C4.75642 6.67106 4.71757 6.47587 4.71757 6.27875C4.71757 6.08163 4.75642 5.88644 4.83191 5.70434C4.9074 5.52224 5.01804 5.35681 5.1575 5.2175C5.29681 5.07804 5.46224 4.9674 5.64434 4.89191C5.82644 4.81642 6.02163 4.77757 6.21875 4.77757C6.41587 4.77757 6.61106 4.81642 6.79316 4.89191C6.97526 4.9674 7.14069 5.07804 7.28 5.2175L7.325 5.2625C7.50176 5.4354 7.72626 5.55139 7.96956 5.5955C8.21285 5.63962 8.46379 5.60984 8.69 5.51H8.75C8.97183 5.41493 9.16101 5.25707 9.29427 5.05585C9.42753 4.85463 9.49904 4.61884 9.5 4.3775V4.25C9.5 3.85218 9.65804 3.47064 9.93934 3.18934C10.2206 2.90804 10.6022 2.75 11 2.75C11.3978 2.75 11.7794 2.90804 12.0607 3.18934C12.342 3.47064 12.5 3.85218 12.5 4.25V4.3175C12.501 4.55884 12.5725 4.79463 12.7057 4.99585C12.839 5.19707 13.0282 5.35493 13.25 5.45C13.4762 5.54984 13.7271 5.57962 13.9704 5.5355C14.2137 5.49139 14.4382 5.3754 14.615 5.2025L14.66 5.1575C14.7993 5.01804 14.9647 4.9074 15.1468 4.83191C15.3289 4.75642 15.5241 4.71757 15.7213 4.71757C15.9184 4.71757 16.1136 4.75642 16.2957 4.83191C16.4778 4.9074 16.6432 5.01804 16.7825 5.1575C16.922 5.29681 17.0326 5.46224 17.1081 5.64434C17.1836 5.82644 17.2224 6.02163 17.2224 6.21875C17.2224 6.41587 17.1836 6.61106 17.1081 6.79316C17.0326 6.97526 16.922 7.14069 16.7825 7.28L16.7375 7.325C16.5646 7.50176 16.4486 7.72626 16.4045 7.96956C16.3604 8.21285 16.3902 8.46379 16.49 8.69V8.75C16.5851 8.97183 16.7429 9.16101 16.9442 9.29427C17.1454 9.42753 17.3812 9.49904 17.6225 9.5H17.75C18.1478 9.5 18.5294 9.65804 18.8107 9.93934C19.092 10.2206 19.25 10.6022 19.25 11C19.25 11.3978 19.092 11.7794 18.8107 12.0607C18.5294 12.342 18.1478 12.5 17.75 12.5H17.6825C17.4412 12.501 17.2054 12.5725 17.0042 12.7057C16.8029 12.839 16.6451 13.0282 16.55 13.25V13.25Z"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function BellIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M5 6.66667C5 5.34058 5.52678 4.06881 6.46447 3.13113C7.40215 2.19345 8.67392 1.66667 10 1.66667C11.3261 1.66667 12.5979 2.19345 13.5355 3.13113C14.4732 4.06881 15 5.34058 15 6.66667C15 12.5 17.5 14.1667 17.5 14.1667H2.5C2.5 14.1667 5 12.5 5 6.66667Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.58333 17.5C8.72282 17.7537 8.92787 17.9653 9.17708 18.1127C9.42628 18.26 9.71048 18.3378 10 18.3378C10.2895 18.3378 10.5737 18.26 10.8229 18.1127C11.0721 17.9653 11.2772 17.7537 11.4167 17.5"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function HelpIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.58418 7.50006C7.57872 7.06406 7.68739 6.63421 7.8994 6.25319C8.11141 5.87217 8.41938 5.55323 8.79276 5.32802C9.16613 5.10281 9.59191 4.97917 10.0278 4.96938C10.4638 4.95959 10.8947 5.06398 11.2778 5.27219C11.6609 5.4804 11.9829 5.78519 12.2118 6.15631C12.4407 6.52742 12.5685 6.95195 12.5827 7.38776C12.5968 7.82356 12.4967 8.25548 12.2923 8.64064C12.0879 9.0258 11.7863 9.3508 11.4175 9.58339C10.7508 10.0001 10.0008 10.4167 10.0008 11.5001"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M10 14.1667H10.0083" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function DocIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M5 1.66667H12.5L16.6667 5.83333V18.3333H5V1.66667Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12.5 1.66667V5.83333H16.6667" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7.5 10.8333H12.5M7.5 14.1667H12.5M7.5 7.5H9.16667" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ShieldIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 18.3333C10 18.3333 16.6667 15 16.6667 10V4.16667L10 1.66667L3.33333 4.16667V10C3.33333 15 10 18.3333 10 18.3333Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M7.5 10L9.16667 11.6667L12.5 8.33333" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function RefundIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M3.33333 1.66667V18.3333L5.41667 17.0833L7.5 18.3333L10 17.0833L12.5 18.3333L14.5833 17.0833L16.6667 18.3333V1.66667L14.5833 2.91667L12.5 1.66667L10 2.91667L7.5 1.66667L5.41667 2.91667L3.33333 1.66667Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M6.66667 7.5H13.3333M6.66667 10.8333H10.8333" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function InfoIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M10 13.3333V10M10 6.66667H10.0083" stroke="white" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function rowIcon(id: SettingsRowIcon) {
  switch (id) {
    case "profile":
      return <UserIcon />;
    case "account":
      return <SettingsGearIcon />;
    case "subscription":
      return <CrownIcon />;
    case "notification":
      return <BellIcon />;
    case "support":
      return <HelpIcon />;
    case "terms":
      return <DocIcon />;
    case "privacy":
      return <ShieldIcon />;
    case "refund":
      return <RefundIcon />;
    case "about":
      return <InfoIcon />;
  }
}

function SettingsRowItem({ row, isLast, onPress }: { row: SettingsRow; isLast: boolean; onPress?: () => void }) {
  return (
    <>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} className="w-full flex-row items-center gap-[13px] py-[15px]">
        <View className="size-[22px] items-center justify-center">{rowIcon(row.id)}</View>
        <Text className="flex-1 font-aeonik-medium text-[13.5px] leading-[18px] text-white">{row.label}</Text>
        <ChevronRightIcon />
      </TouchableOpacity>
      {!isLast ? <View className="h-px w-full bg-[rgba(255,255,255,0.06)]" /> : null}
    </>
  );
}

function GroupCard({ rows, onPressRow }: { rows: SettingsRow[]; onPressRow?: (row: SettingsRow) => void }) {
  return (
    <View className="w-full rounded-[18px] bg-[#161616] px-5">
      {rows.map((row, index) => (
        <SettingsRowItem
          key={row.id}
          row={row}
          isLast={index === rows.length - 1}
          onPress={onPressRow ? () => onPressRow(row) : undefined}
        />
      ))}
    </View>
  );
}

function SectionLabel({ title }: { title: string }) {
  return (
    <Text
      className="pb-[10px] pl-1 pt-[22px] font-aeonik-bold text-[11px] leading-[14px] tracking-[0.8px]"
      style={{ color: "#8c878c" }}
    >
      {title}
    </Text>
  );
}

/** Figma "Subscription Box / Free" (node 6608:6209). */
function FreeSubscriptionBox({ onPress }: { onPress: () => void }) {
  return (
    <View className="w-full flex-row items-center gap-[14px] rounded-[18px] border border-[#333] bg-[#161616] p-4">
      <View className="size-[50px] items-center justify-center rounded-[15px] border border-[#3a3a3a] bg-[#161616]">
        <CrownIcon size={22} strokeWidth={1.5} />
      </View>
      <View className="flex-1 gap-2">
        <Text className="font-aeonik-bold text-[15px] leading-5 text-white">Free Plan</Text>
        <Text className="font-kalpurush text-[11.5px] leading-[15px] text-[#c8c7cc]">
          সব অডিও বুকের এক্সেস পেতে এখনি আপগ্রেড করুন
        </Text>
        <TouchableOpacity activeOpacity={0.85} onPress={onPress} className="self-start overflow-hidden rounded-[10px]">
          <LinearGradient
            colors={["#e04242", "#ad3334", "#7a2425"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ paddingHorizontal: 13, paddingVertical: 8 }}
          >
            <Text className="font-aeonik-bold text-[11.5px] leading-[15px] text-white">Upgrade to Premium</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/** Figma "Subscription Box / Premium" (node 6608:6596). */
function PremiumSubscriptionBox({
  planLabel,
  renewsOn,
  onPress,
}: {
  planLabel: string;
  renewsOn: string;
  onPress: () => void;
}) {
  return (
    <View className="w-full overflow-hidden rounded-[18px] border" style={{ borderColor: "rgba(240,198,116,0.35)" }}>
      <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
        <LinearGradient
          colors={["#551f00", "#730000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flexDirection: "row", alignItems: "center", gap: 14, padding: 16 }}
        >
          <Image source={images.settingsPremiumStar} style={{ width: 45, height: 44 }} contentFit="contain" />
          <View className="flex-1 gap-1">
            <View className="flex-row items-center gap-2">
              <Text className="font-li-ador-bold text-[15.5px] leading-[21px] text-white">{planLabel}</Text>
              <View className="rounded-full bg-[#26a555] px-2 py-[3px]">
                <Text className="font-aeonik-bold text-[9px] leading-3 text-white">Active</Text>
              </View>
            </View>
            {renewsOn ? (
              <Text className="font-aeonik-regular text-[11.5px] leading-[15px] text-[#d9d1bf]">{renewsOn}</Text>
            ) : null}
            <Text className="font-aeonik-bold text-[11.5px] leading-[15px]" style={{ color: "#f0c674" }}>
              Manage subscription
            </Text>
          </View>
          <ChevronRightIcon size={18} color="#f0c674" strokeWidth={2.1} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

/** Figma "Settings Page" — Free variant node 6608:6133, Premium variant
 * node 6608:6320. Rendered as the 4th tab ("Profile" in the bottom menu). */
export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { signOut } = useClerk();
  const { planId, activatedAt } = useSubscriptionStore();

  const handleLogOut = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <SafeAreaView edges={[]} style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View>
          {/* Glow bleeds up behind the status bar, same technique as the
              home/explore/library screens' header glow. */}
          <View pointerEvents="none" style={{ position: "absolute", left: -242, top: -113, width: 796, height: 229 }}>
            <Image source={images.settingsGlow} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          </View>

          <View className="gap-2 px-5" style={{ paddingTop: insets.top + 14 }}>
            <Text className="font-aeonik-bold text-[30px] leading-[39px] tracking-[-0.5px] text-white">Settings</Text>
            <View className="h-1 w-[46px] rounded-full bg-primary" />
          </View>
        </View>

        <View className="px-5 pt-[22px]">
          {planId === "free" ? (
            <FreeSubscriptionBox onPress={() => router.push("/subscription")} />
          ) : (
            <PremiumSubscriptionBox
              planLabel={getPlan(planId).label}
              renewsOn={getRenewalLabel(planId, activatedAt)}
              onPress={() => router.push("/subscription")}
            />
          )}
        </View>

        <View className="px-5">
          <SectionLabel title="ACCOUNT" />
        </View>
        <View className="px-5">
          <GroupCard
            rows={accountRows}
            onPressRow={(row) => {
              if (row.id === "profile") {
                router.push("/my-profile");
              } else if (row.id === "account") {
                router.push("/account");
              } else if (row.id === "subscription") {
                router.push("/subscription");
              } else if (row.id === "notification") {
                router.push("/notification-settings");
              }
            }}
          />
        </View>

        <View className="px-5">
          <SectionLabel title="SUPPORT & LEGAL" />
        </View>
        <View className="px-5">
          <GroupCard rows={supportRows} />
        </View>

        <TouchableOpacity activeOpacity={0.7} onPress={handleLogOut} className="items-center gap-[10px] pb-[6px] pt-[26px]">
          <Text className="font-aeonik-medium text-[13.5px] leading-[18px]" style={{ color: colors.primary }}>
            Log Out
          </Text>
          <Text className="font-aeonik-regular text-[10.5px] leading-[14px]" style={{ color: "#8c878c" }}>
            Shuno FM v1.0.0
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
