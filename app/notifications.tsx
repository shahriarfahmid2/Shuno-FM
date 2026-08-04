import { images } from "@/constants/images";
import { notificationSections, type NotificationIconKind, type NotificationItem } from "@/data/notifications";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import type { ComponentType } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

function ClockIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path
        d="M11 19.25C15.5563 19.25 19.25 15.5563 19.25 11C19.25 6.44365 15.5563 2.75 11 2.75C6.44365 2.75 2.75 6.44365 2.75 11C2.75 15.5563 6.44365 19.25 11 19.25Z"
        stroke="white"
        strokeWidth={1.89}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M11 6.41667V11L13.75 12.8333" stroke="white" strokeWidth={1.89} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function DownloadIcon() {
  return (
    <Svg width={17.5} height={16} viewBox="0 0 17.5 16" fill="none">
      <Path
        d="M9.25037 11.7982C9.12206 11.9268 8.94074 12 8.75057 12C8.56039 12 8.37907 11.9268 8.25076 11.7982L4.63877 8.17746C4.38639 7.92447 4.40557 7.53186 4.68161 7.30055C4.95766 7.06924 5.38604 7.08679 5.63842 7.33978L8.07332 9.78058V0.62069C8.07332 0.277895 8.37655 0 8.75057 0C9.12458 0 9.42781 0.277895 9.42781 0.62069V9.78058L11.8627 7.33978C12.1151 7.08679 12.5435 7.06924 12.8195 7.30055C13.0956 7.53186 13.1147 7.92447 12.8623 8.17746L9.25037 11.7982Z"
        fill="white"
      />
      <Path
        d="M1.34615 10.6C1.34615 10.2686 1.04481 10 0.673077 10C0.30135 10 0 10.2686 0 10.6V10.6439C0 11.738 0 12.6198 0.10457 13.3134C0.213177 14.0335 0.445515 14.6398 0.985699 15.1213C1.52588 15.6029 2.20602 15.81 3.01381 15.9068C3.79186 16 4.78113 16 6.00845 16H11.4916C12.7189 16 13.7082 16 14.4862 15.9068C15.294 15.81 15.9741 15.6029 16.5143 15.1213C17.0545 14.6398 17.2869 14.0335 17.3954 13.3134C17.5 12.6198 17.5 11.738 17.5 10.6439V10.6C17.5 10.2686 17.1986 10 16.8269 10C16.4552 10 16.1538 10.2686 16.1538 10.6C16.1538 11.7483 16.1524 12.5492 16.0613 13.1535C15.9727 13.7406 15.8108 14.0514 15.5624 14.2728C15.314 14.4942 14.9654 14.6386 14.3068 14.7175C13.6289 14.7987 12.7305 14.8 11.4423 14.8H6.05769C4.7695 14.8 3.87106 14.7987 3.19318 14.7175C2.53467 14.6386 2.18595 14.4942 1.93757 14.2728C1.6892 14.0514 1.52726 13.7406 1.43872 13.1535C1.34758 12.5492 1.34615 11.7483 1.34615 10.6Z"
        fill="white"
      />
    </Svg>
  );
}

function CardIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M15 3.75H3C2.17157 3.75 1.5 4.42157 1.5 5.25V12.75C1.5 13.5784 2.17157 14.25 3 14.25H15C15.8284 14.25 16.5 13.5784 16.5 12.75V5.25C16.5 4.42157 15.8284 3.75 15 3.75Z"
        stroke="white"
        strokeWidth={1.31}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M1.5 7.5H16.5" stroke="white" strokeWidth={1.31} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const ICON_TILE: Record<NotificationIconKind, { background: string; Icon: ComponentType }> = {
  clock: { background: "rgba(233,169,76,0.18)", Icon: ClockIcon },
  download: { background: "rgba(123,198,126,0.18)", Icon: DownloadIcon },
  card: { background: "rgba(95,191,176,0.18)", Icon: CardIcon },
};

/** Figma "Notification Row" (e.g. node 6621:8517). */
function NotificationCard({ item }: { item: NotificationItem }) {
  const { background, Icon } = ICON_TILE[item.icon];

  return (
    <View
      className="w-full flex-row items-start gap-3 rounded-[15px] border border-[#363636] px-4 py-[13px]"
      style={{ backgroundColor: "rgba(233,169,76,0.09)" }}
    >
      <View className="size-10 items-center justify-center rounded-[12px]" style={{ backgroundColor: background }}>
        <Icon />
      </View>
      <View className="flex-1 gap-[5px]">
        <View className="flex-row items-center gap-[6px]">
          <Text className="flex-1 font-aeonik-bold text-[13px] leading-[17px] text-white">{item.title}</Text>
          {item.unread ? <View className="size-[7px] rounded-full bg-primary" /> : null}
        </View>
        <Text className="font-aeonik-regular text-[11.5px] leading-[17px] text-[#c8c7cc]">{item.body}</Text>
        <Text className="font-aeonik-regular text-[10px] leading-[13px] text-[#8c878c]">{item.timeAgo}</Text>
      </View>
    </View>
  );
}

function SectionLabel({ title }: { title: string }) {
  return (
    <Text className="pb-[10px] pt-[22px] font-aeonik-bold text-[11px] leading-[14px] tracking-[0.7px] text-[#8c878c]">
      {title}
    </Text>
  );
}

/**
 * Figma "Notification" feed page (node 6621:8411) — pushed from the bell
 * icon in the Home header (app/(tabs)/home.tsx). Not part of the (tabs)
 * group; unlike the other pushed sub-pages (history, search, subscription)
 * it deliberately has no bottom menu, since it reads as a notification
 * inbox layered on top of whichever tab the user came from, not a
 * destination of its own — back navigation is the native swipe/hardware
 * back gesture.
 */
export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();

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

          <View className="gap-2 px-5" style={{ paddingTop: insets.top + 14 }}>
            <Text className="font-aeonik-bold text-[30px] leading-[39px] tracking-[-0.5px] text-white">Notification</Text>
            <View className="h-1 w-[46px] rounded-full bg-primary" />
          </View>
        </View>

        {notificationSections.map((section) => (
          <View key={section.label} className="px-5">
            <SectionLabel title={section.label} />
            <View className="gap-3">
              {section.items.map((item) => (
                <NotificationCard key={item.id} item={item} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
