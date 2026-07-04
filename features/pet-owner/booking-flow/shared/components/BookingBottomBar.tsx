import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";

interface BookingBottomBarProps {
  totalLabel: string;
  ctaLabel: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function BookingBottomBar({
  totalLabel,
  ctaLabel,
  onPress,
  disabled,
  loading,
}: BookingBottomBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="border-t border-border/50 bg-card px-5 pt-4"
      style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 20 }}
    >
      <View className="mb-3 flex-row items-center justify-between gap-3">
        <Text className="font-default text-sm text-muted-foreground">
          Tổng cộng
        </Text>
        <Text
          className="flex-1 text-right font-mbold text-xl text-primary"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {totalLabel}
        </Text>
      </View>

      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        className={cn(
          "flex-row items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 shadow-sm",
          disabled || loading ? "opacity-50" : "active:opacity-90",
        )}
      >
        {loading ? <ActivityIndicator size="small" color="#ffffff" /> : null}
        <Text className="font-mbold text-base text-white">{ctaLabel}</Text>
      </Pressable>
    </View>
  );
}
