import { images } from "@/constants/images";
import { paymentMethods } from "@/data/subscription";
import { type PaymentMethodId, type PlanId, useSubscriptionStore } from "@/store/useSubscriptionStore";
import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const PROCESSING_DELAY_MS = 1200;

function BackArrowIcon() {
  return (
    <Svg width={16.5} height={14} viewBox="0 0 16.5 14" fill="none">
      <Path d="M0.75 7H15.75M7 13.25L0.75 7L7 0.75" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
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

/** Figma payment method row, e.g. "Rectangle 37" + "Head" (node 6610:7267). */
function PaymentMethodCard({
  label,
  logo,
  logoWidth,
  logoHeight,
  selected,
  disabled,
  onPress,
}: {
  label: string;
  logo: ImageSourcePropType;
  logoWidth: number;
  logoHeight: number;
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      className="w-full flex-row items-center gap-5 rounded-[14px] border border-[#5f5f5f] bg-black p-[13px]"
    >
      <RadioCircle selected={selected} />
      <View className="gap-[9px]">
        <Text className="font-li-ador-bold text-[15.5px] leading-[21px] text-white">{label}</Text>
        <Image source={logo} style={{ width: logoWidth, height: logoHeight }} contentFit="contain" />
      </View>
    </TouchableOpacity>
  );
}

/**
 * Figma "Payment Page" (node 6610:7266) — pushed from the subscription
 * screen's CTA. No purchase actually goes through here: AGENTS.md's
 * "Purchase Flow & Membership Rules" keep real checkout on the SSLCommerz
 * website, so picking a gateway just simulates the processing step that a
 * real hosted-checkout redirect + IPN webhook would otherwise cover.
 */
export default function SubscriptionPaymentScreen() {
  const insets = useSafeAreaInsets();
  const { plan } = useLocalSearchParams<{ plan: PlanId }>();
  const activate = useSubscriptionStore((state) => state.activate);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectMethod = (id: PaymentMethodId) => {
    if (isProcessing) {
      return;
    }
    setSelectedMethod(id);
    setIsProcessing(true);
    setTimeout(() => {
      activate(plan ?? "monthly", id);
      router.replace("/subscription-success");
    }, PROCESSING_DELAY_MS);
  };

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

          <View className="px-5" style={{ paddingTop: insets.top + 16 }}>
            <TouchableOpacity activeOpacity={0.7} hitSlop={10} onPress={() => router.back()} className="mb-6 self-start">
              <BackArrowIcon />
            </TouchableOpacity>
            <Text className="font-li-ador-bold text-[25px] leading-[34px] tracking-[-0.3px] text-white">পেমেন্ট মেথড</Text>
            <Text className="pt-[6px] font-kalpurush text-[14px] leading-[18px] text-[#c8c7cc]">
              আপনার পছন্দের পেমেন্ট গেটওয়েটি সিলেক্ট করুন
            </Text>
          </View>
        </View>

        <View className="gap-6 px-5 pt-[35px]">
          <PaymentMethodCard
            label={paymentMethods[0].label}
            logo={images.subscriptionBkashLogo}
            logoWidth={78}
            logoHeight={24}
            selected={selectedMethod === paymentMethods[0].id}
            disabled={isProcessing}
            onPress={() => handleSelectMethod(paymentMethods[0].id)}
          />
          <PaymentMethodCard
            label={paymentMethods[1].label}
            logo={images.subscriptionSslcommerzLogo}
            logoWidth={110}
            logoHeight={24}
            selected={selectedMethod === paymentMethods[1].id}
            disabled={isProcessing}
            onPress={() => handleSelectMethod(paymentMethods[1].id)}
          />

          {isProcessing ? (
            <View className="flex-row items-center justify-center gap-[10px] pt-4">
              <ActivityIndicator color="#e04242" />
              <Text className="font-aeonik-medium text-[12.5px] leading-4 text-[#c8c7cc]">পেমেন্ট প্রসেসিং হচ্ছে...</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
