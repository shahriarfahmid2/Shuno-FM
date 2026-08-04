import { notificationSettings, type NotificationSettingId } from "@/data/notification-settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

function buildDefaultSettings() {
  return Object.fromEntries(notificationSettings.map((setting) => [setting.id, setting.defaultEnabled])) as Record<
    NotificationSettingId,
    boolean
  >;
}

type NotificationSettingsState = {
  values: Record<NotificationSettingId, boolean>;
  toggle: (id: NotificationSettingId) => void;
  setValue: (id: NotificationSettingId, value: boolean) => void;
};

export const useNotificationSettingsStore = create<NotificationSettingsState>()(
  persist(
    (set) => ({
      values: buildDefaultSettings(),
      toggle: (id) =>
        set((state) => ({
          values: { ...state.values, [id]: !state.values[id] },
        })),
      setValue: (id, value) =>
        set((state) => ({
          values: { ...state.values, [id]: value },
        })),
    }),
    {
      name: "notification-settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
