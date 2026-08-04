export type NotificationIconKind = "clock" | "download" | "card";

export type NotificationItem = {
  id: string;
  icon: NotificationIconKind;
  title: string;
  body: string;
  timeAgo: string;
  unread: boolean;
};

export type NotificationSection = {
  label: string;
  items: NotificationItem[];
};

/** Figma "Notification" feed page (node 6621:8411). */
export const notificationSections: NotificationSection[] = [
  {
    label: "TODAY",
    items: [
      {
        id: "subscription-expiring",
        icon: "clock",
        title: "Your subscription is expiring soon",
        body: "Your Monthly plan ends in 3 days. Renew manually to keep listening without interruption.",
        timeAgo: "2h ago",
        unread: true,
      },
    ],
  },
  {
    label: "YESTERDAY",
    items: [
      {
        id: "download-complete",
        icon: "download",
        title: "Download complete",
        body: "Rich Dad Poor Dad is ready to listen offline.",
        timeAgo: "1d ago",
        unread: false,
      },
    ],
  },
  {
    label: "THIS WEEK",
    items: [
      {
        id: "payment-received",
        icon: "card",
        title: "Payment received",
        body: "Your payment of ৳249 for Monthly plan was successful.",
        timeAgo: "4d ago",
        unread: false,
      },
    ],
  },
];
