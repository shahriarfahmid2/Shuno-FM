import { SubscriptionInfoBox } from "@/components/SubscriptionInfoBox";
import { images } from "@/constants/images";
import { getExpiryDate, premiumFeatures, subscriptionPlans, type SubscriptionPlan } from "@/data/subscription";
import { type PlanId, useSubscriptionStore } from "@/store/useSubscriptionStore";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

function CheckIcon() {
  return (
    <Svg width={13} height={13} viewBox="0 0 13 13" fill="none">
      <Path
        d="M10.8333 3.25L4.875 9.20833L2.16667 6.5"
        stroke="#59B87A"
        strokeWidth={1.66833}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function RadioCircle({ selected }: { selected: boolean }) {
  return (
    <View className="size-[27px] items-center justify-center rounded-full border border-[#d3d3d3] bg-black">
      {selected ? <View className="size-[20.25px] rounded-full bg-primary" /> : null}
    </View>
  );
}

/** Figma "বর্তমান প্ল্যান" badge — same pill treatment as the Profile
 * screen's "Active" badge (app/(tabs)/profile.tsx). */
function CurrentPlanBadge() {
  return (
    <View className="rounded-full bg-[#26a555] px-[10px] py-[5px]">
      <Text className="font-aeonik-bold text-[11px] leading-[14px] text-white">বর্তমান প্ল্যান</Text>
    </View>
  );
}

/** Figma plan card, e.g. "Rectangle 47" + "Head"/"Price" (node 6612:7511). */
function PlanCard({
  plan,
  selected,
  isCurrent,
  onPress,
}: {
  plan: SubscriptionPlan;
  selected: boolean;
  isCurrent: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="w-full flex-row items-center gap-5 rounded-[18px] border border-[#5f5f5f] bg-black p-[13px]"
    >
      <RadioCircle selected={selected} />
      <View>
        <View className="flex-row items-center gap-2">
          <Text className="font-li-ador-semibold text-[15.5px] leading-[18px] text-white">{plan.label}</Text>
          {isCurrent ? <CurrentPlanBadge /> : null}
        </View>
        <View className="flex-row items-baseline gap-[6px]" style={{ marginTop: -2 }}>
          <Text className="font-li-ador-bold text-[26px] leading-[30px] tracking-[-0.6px] text-white">{plan.price}</Text>
          {plan.priceSuffix ? (
            <Text className="font-aeonik-medium text-[11.5px] leading-4 text-[#8c878c]">{plan.priceSuffix}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

/** Figma "সাবস্ক্রিপশন আপগ্রেড করুণ" CTA (node 6612:7541). Disabled/muted
 * when the selected plan matches the current plan — nothing to upgrade to. */
function UpgradeCta({ enabled, onPress }: { enabled: boolean; onPress: () => void }) {
  if (!enabled) {
    return (
      <View className="h-[60px] w-full items-center justify-center rounded-[14px]" style={{ backgroundColor: "#330000" }}>
        <Text className="font-li-ador-regular text-[18px] leading-[22px]" style={{ color: "#5c5c5c" }}>
          সাবস্ক্রিপশন আপগ্রেড করুণ
        </Text>
      </View>
    );
  }
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="h-[60px] w-full items-center justify-center rounded-[14px] bg-primary"
    >
      <Text className="font-li-ador-regular text-[18px] leading-[22px] text-white">সাবস্ক্রিপশন আপগ্রেড করুণ</Text>
    </TouchableOpacity>
  );
}

function FeatureRow({ text }: { text: string }) {
  return (
    <View className="w-full flex-row items-start gap-[9px]">
      <View className="pt-[4px]">
        <CheckIcon />
      </View>
      <Text className="flex-1 font-kalpurush text-[15px] leading-[24px] text-[#c8c7cc]">{text}</Text>
    </View>
  );
}

/**
 * Figma "Subscription page 2" (node 6609:6976) — pushed from the Profile
 * screen's "Upgrade to Premium" button and "Subscription"/"Manage
 * subscription" rows. Picking a different plan than the current one enables
 * the CTA, which hands off to the payment method screen.
 */
export default function SubscriptionScreen() {
  const insets = useSafeAreaInsets();
  const { planId, activatedAt, paymentMethodId } = useSubscriptionStore();
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(planId);

  const canUpgrade = selectedPlan !== planId;
  const hasActiveSubscription = planId !== "free";
  const currentExpiry = getExpiryDate(planId, activatedAt);

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        <View>
          {/* Glow bleeds up behind the status bar, same asset/technique as
              the settings screen's header glow (app/(tabs)/profile.tsx). */}
          <View pointerEvents="none" style={{ position: "absolute", left: -242, top: -113, width: 796, height: 229 }}>
            <Image source={images.settingsGlow} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          </View>

          <View className="gap-[2px] px-5" style={{ paddingTop: insets.top + 24 }}>
            <View className="items-center">
              <Image source={images.subscriptionPremiumIcon} style={{ width: 70, height: 70 }} contentFit="cover" />
            </View>
            <View className="w-full items-center">
              <Text
                numberOfLines={1}
                className="w-full text-center font-li-ador-bold text-[30px] leading-10 tracking-[-0.3px] text-white"
              >
                সেরা প্ল্যানটি বেছে নিন
              </Text>
              <Text className="text-center font-kalpurush text-[15.5px] leading-[19px] text-[#c8c7cc]" style={{ marginTop: -4 }}>
                দ্রুত শিখুন, আরও বেশি জানুন
              </Text>
            </View>
          </View>
        </View>

        <View className="gap-[19px] px-5 pt-[35px]">
          {subscriptionPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={selectedPlan === plan.id}
              isCurrent={planId === plan.id}
              onPress={() => setSelectedPlan(plan.id)}
            />
          ))}

          <UpgradeCta
            enabled={canUpgrade}
            onPress={() => router.push({ pathname: "/subscription-payment", params: { plan: selectedPlan } })}
          />
        </View>

        <View className="gap-[16px] px-5 pt-7">
          <Text className="font-li-ador-regular text-[20px] leading-[34px] tracking-[-0.3px] text-white">
            প্রিমিয়াম প্ল্যানে থাকছে :
          </Text>
          <View className="gap-[9px]">
            {premiumFeatures.map((feature) => (
              <FeatureRow key={feature} text={feature} />
            ))}
          </View>
        </View>

        {hasActiveSubscription ? (
          <View className="px-5 pt-7">
            <SubscriptionInfoBox planId={planId} method={paymentMethodId} expiry={currentExpiry} />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
