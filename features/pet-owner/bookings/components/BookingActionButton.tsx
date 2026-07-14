import React from "react";
import { Pressable, Text } from "react-native";

import { cn } from "@/lib/utils";

type BookingActionButtonProps = {
  label: string | React.ReactNode;
  variant?: "primary" | "muted";
  onPress?: () => void;
  className?: string;
};

export function BookingActionButton({
  label,
  variant = "primary",
  onPress,
  className,
}: BookingActionButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={typeof label === "string" ? label : "Button"}
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.98 : 1 }] })}
      className={cn(
        "items-center justify-center rounded-full border py-3",
        isPrimary ? "border-primary" : "border-border",
        className,
      )}
    >
      {typeof label === "string" ? (
        <Text
          className={cn(
            "font-mbold text-[13px] leading-5",
            isPrimary ? "text-primary" : "text-muted-foreground",
          )}
        >
          {label}
        </Text>
      ) : (
        label
      )}
    </Pressable>
  );
}
