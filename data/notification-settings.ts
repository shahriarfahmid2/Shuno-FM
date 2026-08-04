export type NotificationSettingId = "new-audiobook-updates" | "subscription-updates";

export type NotificationSetting = {
  id: NotificationSettingId;
  label: string;
  defaultEnabled: boolean;
};

/** "Toggle Group Card" rows (Figma node 6622:8713). */
export const notificationSettings: NotificationSetting[] = [
  { id: "new-audiobook-updates", label: "New Audiobook Updates", defaultEnabled: true },
  { id: "subscription-updates", label: "Subscription Updates", defaultEnabled: true },
];
