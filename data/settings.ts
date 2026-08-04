export type SettingsRowIcon =
  | "profile"
  | "account"
  | "subscription"
  | "notification"
  | "support"
  | "terms"
  | "privacy"
  | "refund"
  | "about";

export type SettingsRow = { id: SettingsRowIcon; label: string };

/** "Group Card / Account" rows (Figma node 6608:6223). */
export const accountRows: SettingsRow[] = [
  { id: "profile", label: "Profile" },
  { id: "account", label: "Account" },
  { id: "subscription", label: "Subscription" },
  { id: "notification", label: "Notification" },
];

/** "Group Card / Support & Legal" rows (Figma node 6608:6262). */
export const supportRows: SettingsRow[] = [
  { id: "support", label: "Support" },
  { id: "terms", label: "Terms and Conditions" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "refund", label: "Cancellation and Refund Policy" },
  { id: "about", label: "About Us" },
];
