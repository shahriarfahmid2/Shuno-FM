import { colors } from "@/constants/theme";
import { cn } from "@/lib/cn";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

type SectionHeaderProps = {
  title: string;
  onSeeAll?: () => void;
  className?: string;
};

function ChevronRightIcon() {
  return (
    <Svg width={5} height={9} viewBox="0 0 5.0633 8.70488" fill="none">
      <Path
        d="M0.358403 0.348637L4.3584 4.46068L0.410576 8.34864"
        stroke={colors.mutedInverse}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * Section title + "See all" link — Figma "Title" pattern reused across the
 * home screen's book/author/podcast rows (nodes 101:1736, 101:1848, 101:1770).
 */
export function SectionHeader({ title, onSeeAll, className }: SectionHeaderProps) {
  return (
    <View className={cn("flex-row items-center justify-between px-4", className)}>
      <Text className="font-li-ador-semibold text-[17px] leading-[22px] text-white">{title}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onSeeAll}
        hitSlop={8}
        className="flex-row items-center gap-1"
      >
        <Text
          className="font-aeonik-medium text-[11px] leading-[13px]"
          style={{ color: colors.mutedInverse }}
        >
          See all
        </Text>
        <ChevronRightIcon />
      </TouchableOpacity>
    </View>
  );
}
