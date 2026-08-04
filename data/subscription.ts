import type { PaymentMethodId, PlanId } from "@/store/useSubscriptionStore";

export type SubscriptionPlan = {
  id: PlanId;
  label: string;
  price: string;
  priceSuffix?: string;
};

/** "Subscription page 2" plan cards (Figma node 6609:6976). */
export const subscriptionPlans: SubscriptionPlan[] = [
  { id: "free", label: "ফ্রি", price: "৳ 0", priceSuffix: "forever" },
  { id: "monthly", label: "১ মাস (প্রিমিয়াম)", price: "৳ ৯৯" },
  { id: "yearly", label: "১ বছর (প্রিমিয়াম)", price: "৳ ২৯৯" },
];

export function getPlan(planId: PlanId): SubscriptionPlan {
  return subscriptionPlans.find((plan) => plan.id === planId) ?? subscriptionPlans[0];
}

/** "প্রিমিয়াম প্ল্যানে থাকছে :" feature list (Figma node 6609:6976). */
export const premiumFeatures: string[] = [
  "সব অডিওবুকের ফুল এক্সেস",
  "হাই কোয়ালিটি অডিও",
  "অফলাইন ডাউনলোড",
  "১ডিভাইজ লিমিট",
  "এক্সক্লুসিভ নতুন অডিওবুকের ফ্রি এক্সেস",
];

export type PaymentMethod = {
  id: PaymentMethodId;
  label: string;
  description: string;
};

/** "Payment Page" gateway rows (Figma node 6610:7266). */
export const paymentMethods: PaymentMethod[] = [
  { id: "bkash", label: "বিকাশ", description: "bKash" },
  { id: "sslcommerz", label: "নগদ, রকেট, উপায়, ভিসা ও মাস্টার কার্ড", description: "SSLCommerz" },
];

/** When the current billing period ends, given when it was activated. */
export function getExpiryDate(planId: PlanId, activatedAt: string | null): Date | null {
  if (planId === "free" || !activatedAt) {
    return null;
  }
  const expiry = new Date(activatedAt);
  if (planId === "monthly") {
    expiry.setMonth(expiry.getMonth() + 1);
  } else {
    expiry.setFullYear(expiry.getFullYear() + 1);
  }
  return expiry;
}

export function formatExpiryDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/** "Renews on ..." label shown on the Profile screen's Premium box. */
export function getRenewalLabel(planId: PlanId, activatedAt: string | null): string {
  const expiry = getExpiryDate(planId, activatedAt);
  return expiry ? `Renews on ${formatExpiryDate(expiry)}` : "";
}

export function getPaymentMethod(id: PaymentMethodId | null | undefined): PaymentMethod | undefined {
  return paymentMethods.find((method) => method.id === id);
}
