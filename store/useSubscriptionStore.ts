import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type PlanId = "free" | "monthly" | "yearly";
export type PaymentMethodId = "bkash" | "sslcommerz";

type SubscriptionState = {
  planId: PlanId;
  activatedAt: string | null;
  paymentMethodId: PaymentMethodId | null;
  activate: (planId: PlanId, paymentMethodId: PaymentMethodId) => void;
};

/**
 * Mocked subscription mirror — stands in for Supabase's `subscriptions`
 * table (see AGENTS.md "Purchase Flow & Membership Rules") until that's
 * wired up. Persisted locally so the Premium state survives app restarts
 * during development; Supabase remains the real source of truth later.
 */
export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      planId: "free",
      activatedAt: null,
      paymentMethodId: null,
      activate: (planId, paymentMethodId) => set({ planId, paymentMethodId, activatedAt: new Date().toISOString() }),
    }),
    {
      name: "subscription-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
