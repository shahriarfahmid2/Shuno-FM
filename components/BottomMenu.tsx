import { colors } from "@/constants/theme";
import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type MenuItemKey = "home" | "explore" | "library" | "profile";

type BottomMenuProps = {
  variant?: "white" | "black";
  active?: MenuItemKey;
  onSelect?: (key: MenuItemKey) => void;
  className?: string;
};

const items: { key: MenuItemKey; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: "home", label: "Home", icon: "home-outline" },
  { key: "explore", label: "Explore", icon: "search-outline" },
  { key: "library", label: "My Library", icon: "bookmark-outline" },
  { key: "profile", label: "Profile", icon: "person-outline" },
];

/**
 * Bottom tab bar — Figma "Menu" component (node 6330:621), white/black
 * variants for light and dark screens.
 */
export function BottomMenu({
  variant = "white",
  active = "home",
  onSelect,
  className,
}: BottomMenuProps) {
  const isWhite = variant === "white";
  const iconColor = isWhite ? colors.primary : colors.white;
  const labelColor = isWhite ? colors.muted : colors.mutedInverse;

  return (
    <View
      className={cn(
        "h-[75px] w-full flex-row items-center justify-around border-t",
        isWhite ? "border-black/10 bg-white" : "border-white/25 bg-black",
        className,
      )}
    >
      {items.map((item) => {
        const isActive = item.key === active;
        return (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.7}
            onPress={() => onSelect?.(item.key)}
            className="items-center gap-1"
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={isActive ? iconColor : labelColor}
            />
            <Text
              className="font-aeonik-medium text-[10px]"
              style={{ color: isActive ? iconColor : labelColor }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
