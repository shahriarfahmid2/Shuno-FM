import { colors } from "@/constants/theme";
import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type PlayButtonProps = TouchableOpacityProps & {
  label?: string;
  className?: string;
};

/**
 * "Listen now" pill button from the book introduction page
 * (Figma node 116:516): a red pill with a white play-triangle
 * disc (surrounded by a faint halo) and a label to its right.
 */
export function PlayButton({
  label = "এখন শুনুন",
  className,
  ...touchableProps
}: PlayButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className={cn(
        "h-[53px] w-full flex-row items-center justify-center gap-3 rounded-full bg-primary",
        className,
      )}
      {...touchableProps}
    >
      <View className="size-8 items-center justify-center rounded-full bg-white/25">
        <View className="size-6 items-center justify-center rounded-full bg-white">
          <Ionicons name="play" size={12} color={colors.primary} style={{ marginLeft: 1 }} />
        </View>
      </View>
      <Text className="font-li-ador-regular text-[18px] leading-[22px] text-white">{label}</Text>
    </TouchableOpacity>
  );
}
