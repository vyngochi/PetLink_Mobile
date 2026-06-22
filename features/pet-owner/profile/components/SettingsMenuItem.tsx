import React from "react";
import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";

import {
  menuToneStyles,
  profileColors,
} from "@/features/pet-owner/profile/constants/colors";
import type { ProfileMenuItem } from "@/features/pet-owner/profile/types";

type SettingsMenuItemProps = {
  item: ProfileMenuItem;
  onPress?: (item: ProfileMenuItem) => void;
};

export function SettingsMenuItem({ item, onPress }: SettingsMenuItemProps) {
  const { icon: Icon, label, tone } = item;
  const toneStyle = menuToneStyles[tone];

  return (
    <Pressable
      onPress={() => onPress?.(item)}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.99 : 1 }] })}
      className="flex-row items-center justify-between rounded-[16px] border border-border bg-card p-4"
    >
      <View className="flex-row items-center gap-4">
        <View
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: toneStyle.bgColor }}
        >
          <Icon size={20} color={toneStyle.color} />
        </View>
        <Text className="font-mbold text-[14px] leading-5 text-foreground">
          {label}
        </Text>
      </View>
      <ChevronRight size={20} color={profileColors.outline} />
    </Pressable>
  );
}
