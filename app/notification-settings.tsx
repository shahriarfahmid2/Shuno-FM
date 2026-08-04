import { images } from "@/constants/images";
import { colors } from "@/constants/theme";
import { notificationSettings } from "@/data/notification-settings";
import { useNotificationSettingsStore } from "@/store/useNotificationSettingsStore";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

function BackIcon() {
  return (
    <Svg width={16.5} height={14} viewBox="0 0 16.5 14" fill="none">
      <Path d="M0.75 7H15.75M7 13.25L0.75 7L7 0.75" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function BellIcon() {
  return (
    <Svg width={19} height={19} viewBox="0 0 19 19" fill="none">
      <Path
        d="M4.75 6.33333C4.75 5.07356 5.25045 3.86537 6.14124 2.97458C7.03204 2.08378 8.24022 1.58333 9.5 1.58333C10.7598 1.58333 11.968 2.08378 12.8588 2.97458C13.7496 3.86537 14.25 5.07356 14.25 6.33333C14.25 11.875 16.625 13.4583 16.625 13.4583H2.375C2.375 13.4583 4.75 11.875 4.75 6.33333Z"
        stroke="white"
        strokeWidth={1.88417}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.15417 16.625C8.28668 16.866 8.48148 17.067 8.71822 17.207C8.95496 17.347 9.22496 17.4209 9.5 17.4209C9.77504 17.4209 10.045 17.347 10.2818 17.207C10.5185 17.067 10.7133 16.866 10.8458 16.625"
        stroke="white"
        strokeWidth={1.88417}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const SWITCH_WIDTH = 46;
const SWITCH_HEIGHT = 27;
const THUMB_SIZE = 21;
const THUMB_INSET = 3;
const SWITCH_OFF_COLOR = "#404042";

/** Figma "Switch (On)" (node 6622:8720) — track + thumb slide between the
 * off/on positions rather than swapping a static asset, so the toggle reads
 * as a real control instead of two frozen screenshots. */
function ToggleSwitch({ value, onToggle }: { value: boolean; onToggle: () => void }) {
  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, { toValue: value ? 1 : 0, duration: 180, useNativeDriver: false }).start();
  }, [value, progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [THUMB_INSET, SWITCH_WIDTH - THUMB_SIZE - THUMB_INSET],
  });
  const backgroundColor = progress.interpolate({ inputRange: [0, 1], outputRange: [SWITCH_OFF_COLOR, colors.primary] });

  return (
    <TouchableOpacity activeOpacity={0.8} hitSlop={8} onPress={onToggle}>
      <Animated.View
        style={{ width: SWITCH_WIDTH, height: SWITCH_HEIGHT, borderRadius: SWITCH_HEIGHT / 2, backgroundColor, justifyContent: "center" }}
      >
        <Animated.View
          style={{
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: THUMB_SIZE / 2,
            backgroundColor: "#ffffff",
            transform: [{ translateX }],
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

function ToggleRow({
  label,
  value,
  onToggle,
  showDivider,
}: {
  label: string;
  value: boolean;
  onToggle: () => void;
  showDivider: boolean;
}) {
  return (
    <>
      <View className="w-full flex-row items-center gap-[13px] py-4">
        <View className="size-5 items-center justify-center">
          <BellIcon />
        </View>
        <Text className="flex-1 font-aeonik-medium text-[13.5px] leading-[18px] text-white">{label}</Text>
        <ToggleSwitch value={value} onToggle={onToggle} />
      </View>
      {showDivider ? <View className="h-px w-full bg-[rgba(255,255,255,0.07)]" /> : null}
    </>
  );
}

/**
 * Figma "Notification Settings" (node 6622:8607) — pushed from the Settings
 * screen's "Notification" row (app/(tabs)/profile.tsx). Not part of the
 * (tabs) group, so it wires its own back button and safe-area insets. No
 * bottom menu — this is a detail screen, back button returns to the
 * profile tab.
 */
export default function NotificationSettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const values = useNotificationSettingsStore((state) => state.values);
  const toggle = useNotificationSettingsStore((state) => state.toggle);

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
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
              <Text className="font-aeonik-bold text-[30px] leading-[39px] tracking-[-0.5px] text-white">
                Notification Settings
              </Text>
              <View className="h-1 w-[46px] rounded-full bg-primary" />
            </View>
          </View>
        </View>

        <View className="px-5 pt-5">
          <View className="w-full rounded-[18px] border border-[#333] bg-[#161616] px-[18px]">
            {notificationSettings.map((setting, index) => (
              <ToggleRow
                key={setting.id}
                label={setting.label}
                value={values[setting.id]}
                onToggle={() => toggle(setting.id)}
                showDivider={index < notificationSettings.length - 1}
              />
            ))}
          </View>
        </View>

        <View className="px-6 pt-3">
          <Text className="font-aeonik-regular text-[11px] leading-[14px] text-[#8c878c]">
            {`You can change these anytime — this won't affect renewal reminders sent by email.`}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
