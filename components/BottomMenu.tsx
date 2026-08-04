import { colors } from "@/constants/theme";
import { cn } from "@/lib/cn";
import { LinearGradient } from "expo-linear-gradient";
import type { ComponentType } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

type MenuItemKey = "home" | "explore" | "library" | "profile";

type BottomMenuProps = {
  variant?: "white" | "black";
  active?: MenuItemKey;
  onSelect?: (key: MenuItemKey) => void;
  className?: string;
};

function HomeIcon() {
  return (
    <Svg width={19.5} height={19.43} viewBox="0 0 19.5001 19.4326" fill="none">
      <Path
        d="M6.75003 14.6826H12.75M0.750029 12.2826V9.81269C0.750029 8.66398 0.750029 8.08962 0.898084 7.56069C1.02923 7.09215 1.24476 6.65147 1.53408 6.2603C1.8607 5.8187 2.31407 5.46608 3.22081 4.76084L5.82081 2.73861C7.22611 1.6456 7.92876 1.0991 8.70464 0.88902C9.38924 0.70366 10.1108 0.70366 10.7954 0.88902C11.5713 1.09909 12.274 1.64561 13.6792 2.73861L16.2793 4.76084C17.186 5.46608 17.6394 5.8187 17.966 6.2603C18.2553 6.65147 18.4708 7.09215 18.602 7.56069C18.75 8.08962 18.75 8.66398 18.75 9.81269V12.2826C18.75 14.5228 18.75 15.6429 18.3141 16.4985C17.9306 17.2512 17.3186 17.8631 16.566 18.2466C15.7103 18.6826 14.5902 18.6826 12.35 18.6826H7.15003C4.90982 18.6826 3.78971 18.6826 2.93407 18.2466C2.18142 17.8631 1.5695 17.2512 1.186 16.4985C0.750029 15.6429 0.750029 14.5228 0.750029 12.2826Z"
        stroke={colors.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function SearchIcon() {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0924 0C15.6573 0 20.1838 4.42666 20.1838 9.86878C20.1838 12.4364 19.1762 14.7781 17.5274 16.5356L20.7718 19.7018C21.0754 19.9987 21.0764 20.4791 20.7728 20.776C20.6215 20.926 20.4215 21 20.2225 21C20.0246 21 19.8256 20.926 19.6733 20.7781L16.3898 17.5759C14.6625 18.9287 12.4724 19.7386 10.0924 19.7386C4.52754 19.7386 0 15.3109 0 9.86878C0 4.42666 4.52754 0 10.0924 0ZM10.0924 1.52015C5.38455 1.52015 1.55443 5.26477 1.55443 9.86878C1.55443 14.4728 5.38455 18.2184 10.0924 18.2184C14.7992 18.2184 18.6293 14.4728 18.6293 9.86878C18.6293 5.26477 14.7992 1.52015 10.0924 1.52015Z"
        fill={colors.primary}
      />
    </Svg>
  );
}

function LibraryIcon() {
  return (
    <Svg width={20.5} height={22.5} viewBox="0 0 20.5003 22.5" fill="none">
      <Path
        opacity={0.4}
        d="M5.89193 8.1748H14.6096"
        stroke={colors.accent}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2501 0.75C2.12775 0.75 0.755564 1.7801 0.755564 10.0663C0.755564 19.3427 0.555905 21.75 2.58556 21.75C4.61395 21.75 7.92672 17.6782 10.2501 17.6782C12.5736 17.6782 15.8864 21.75 17.9148 21.75C19.9444 21.75 19.7448 19.3427 19.7448 10.0663C19.7448 1.7801 18.3726 0.75 10.2501 0.75Z"
        stroke={colors.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ProfileIcon() {
  return (
    <Svg width={15.5} height={19.5} viewBox="0 0 15.5 19.5" fill="none">
      <Path
        d="M0.75 18.75C0.75 14.884 3.88401 11.75 7.75 11.75C11.616 11.75 14.75 14.884 14.75 18.75M11.75 4.75C11.75 6.95914 9.95914 8.75 7.75 8.75C5.54086 8.75 3.75 6.95914 3.75 4.75C3.75 2.54086 5.54086 0.75 7.75 0.75C9.95914 0.75 11.75 2.54086 11.75 4.75Z"
        stroke={colors.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const items: { key: MenuItemKey; label: string; Icon: ComponentType }[] = [
  { key: "home", label: "Home", Icon: HomeIcon },
  { key: "explore", label: "Explore", Icon: SearchIcon },
  { key: "library", label: "My Library", Icon: LibraryIcon },
  { key: "profile", label: "Profile", Icon: ProfileIcon },
];

/**
 * Bottom tab bar — Figma "Menu" component (node 6330:621), black/white
 * variants for dark and light screens. Icons are always brand red in both
 * variants; only the background and label color change. Figma has no
 * distinct active visual state, so `active` only drives accessibility
 * state and the `onSelect` callback, not styling.
 */
export function BottomMenu({
  variant = "white",
  active = "home",
  onSelect,
  className,
}: BottomMenuProps) {
  const isWhite = variant === "white";
  const labelColor = isWhite ? colors.muted : colors.mutedInverse;

  return (
    <View
      className={cn(
        "h-18.75 w-full flex-row items-center",
        isWhite ? "bg-white" : "bg-black",
        className,
      )}
    >
      <LinearGradient
        pointerEvents="none"
        colors={
          isWhite
            ? [
                "rgba(255,255,255,0)",
                "rgba(255,255,255,0.12)",
                "rgba(255,255,255,0.25)",
                "rgba(255,255,255,0.7)",
                "#ffffff",
              ]
            : [
                "rgba(0,0,0,0)",
                "rgba(0,0,0,0.12)",
                "rgba(0,0,0,0.25)",
                "rgba(0,0,0,0.7)",
                "#000000",
              ]
        }
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={{ position: "absolute", left: 0, right: 0, top: -48, height: 48 }}
      />
      {items.map(({ key, label, Icon }) => (
        <TouchableOpacity
          key={key}
          activeOpacity={0.7}
          onPress={() => onSelect?.(key)}
          accessibilityRole="button"
          accessibilityState={{ selected: key === active }}
          className="h-full flex-1 items-center justify-center gap-1"
        >
          <Icon />
          <Text
            className="font-aeonik-medium text-[10px] leading-[13px]"
            style={{ color: labelColor }}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
