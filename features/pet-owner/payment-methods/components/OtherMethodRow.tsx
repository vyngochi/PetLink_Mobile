import React from "react";
import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";

import { Colors } from "@/constants/theme";
import type { OtherPaymentMethod } from "@/features/pet-owner/payment-methods/types";

type OtherMethodRowProps = {
  method: OtherPaymentMethod;
  onPress?: (method: OtherPaymentMethod) => void;
};

export function OtherMethodRow({ method, onPress }: OtherMethodRowProps) {
  const { icon: Icon, name, iconBgClass } = method;

  return (
    <Pressable
      onPress={() => onPress?.(method)}
      accessibilityRole="button"
      accessibilityLabel={name}
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.99 : 1 }] })}
      className="flex-row items-center justify-between rounded-[16px] border border-border bg-card p-4"
    >
      <View className="flex-row items-center gap-4">
        <View
          className={`h-10 w-10 items-center justify-center rounded-lg ${iconBgClass}`}
        >
          <Icon size={20} color="#ffffff" />
        </View>
        <Text className="font-mbold text-[14px] leading-5 text-foreground">
          {name}
        </Text>
      </View>
      <ChevronRight size={20} color={Colors.light.icon} />
    </Pressable>
  );
}
