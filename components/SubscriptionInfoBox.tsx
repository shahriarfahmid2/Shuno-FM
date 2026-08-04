import { formatExpiryDate, getPaymentMethod, getPlan } from "@/data/subscription";
import type { PaymentMethodId, PlanId } from "@/store/useSubscriptionStore";
import { Text, View } from "react-native";

function InfoRow({ label, value, isLast }: { label: string; value: string; isLast: boolean }) {
  return (
    <>
      <View className="w-full flex-row items-center justify-between py-[13px]">
        <Text className="font-kalpurush text-[15px] leading-[20px] text-[#8c878c]">{label}</Text>
        <Text className="font-li-ador-bold text-[15px] leading-[20px] text-white">{value}</Text>
      </View>
      {!isLast ? <View className="h-px w-full bg-[rgba(255,255,255,0.06)]" /> : null}
    </>
  );
}

/**
 * Receipt-style summary of the user's active subscription — plan, price,
 * payment method, expiry date. Not part of any Figma export; shown on the
 * payment-success screen and, when the user already has an active plan,
 * below the "প্রিমিয়াম প্ল্যানে থাকছে :" features list on the plan-select
 * screen (app/subscription.tsx).
 */
export function SubscriptionInfoBox({
  planId,
  method,
  expiry,
}: {
  planId: PlanId;
  method: PaymentMethodId | null | undefined;
  expiry: Date | null;
}) {
  const plan = getPlan(planId);
  const rows = [
    { label: "প্ল্যান", value: plan.label },
    { label: "মূল্য", value: plan.price },
    { label: "পেমেন্ট মেথড", value: getPaymentMethod(method)?.description ?? "—" },
    { label: "মেয়াদ শেষ", value: expiry ? formatExpiryDate(expiry) : "—" },
  ];

  return (
    <View className="w-full gap-1">
      <Text className="pb-1 pl-1 font-li-ador-semibold text-[14.5px] leading-[19px] tracking-[0.8px]" style={{ color: "#8c878c" }}>
        সাবস্ক্রিপশন তথ্য
      </Text>
      <View className="w-full rounded-[18px] bg-[#161616] px-5">
        {rows.map((row, index) => (
          <InfoRow key={row.label} label={row.label} value={row.value} isLast={index === rows.length - 1} />
        ))}
      </View>
    </View>
  );
}
