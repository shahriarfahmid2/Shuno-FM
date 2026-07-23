import { cn } from "@/lib/cn";
import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type PrimaryButtonVariant = "primary" | "black" | "white";

type PrimaryButtonProps = TouchableOpacityProps & {
  children: ReactNode;
  variant?: PrimaryButtonVariant;
  className?: string;
  textClassName?: string;
};

const containerVariantClasses: Record<PrimaryButtonVariant, string> = {
  primary: "bg-primary",
  black: "bg-black",
  white: "bg-white border border-black/10",
};

const textVariantClasses: Record<PrimaryButtonVariant, string> = {
  primary: "text-white",
  black: "text-white",
  white: "text-black",
};

/**
 * Pill CTA button — Figma "Button" component (node 2:601), used for
 * onboarding ("এগিয়ে যান") and other primary actions.
 */
export function PrimaryButton({
  children,
  variant = "primary",
  className,
  textClassName,
  ...touchableProps
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={cn(
        "h-12 w-full items-center justify-center rounded-full",
        containerVariantClasses[variant],
        className,
      )}
      {...touchableProps}
    >
      <Text
        className={cn(
          "font-li-ador-bold text-h4",
          textVariantClasses[variant],
          textClassName,
        )}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
