import type { LucideIcon } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

type BookingInfoRowProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export function BookingInfoRow({ icon: Icon, label, value }: BookingInfoRowProps) {
  return (
    <View className="flex-row items-center gap-3">
      <View className="h-9 w-9 items-center justify-center rounded-full bg-muted">
        <Icon size={16} className="text-muted-foreground" />
      </View>
      <View className="flex-1">
        <Text className="font-mbold text-[10px] uppercase leading-4 tracking-wider text-muted-foreground">
          {label}
        </Text>
        <Text
          className="font-default text-[14px] leading-5 text-foreground"
          numberOfLines={1}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}
