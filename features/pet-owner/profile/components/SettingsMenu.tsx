import React from "react";
import { View } from "react-native";

import { SettingsMenuItem } from "@/features/pet-owner/profile/components/SettingsMenuItem";
import { profileMenuItems } from "@/features/pet-owner/profile/constants/menuItems";
import type { ProfileMenuItem } from "@/features/pet-owner/profile/types";

type SettingsMenuProps = {
  items?: ProfileMenuItem[];
  onItemPress?: (item: ProfileMenuItem) => void;
};

export function SettingsMenu({
  items = profileMenuItems,
  onItemPress,
}: SettingsMenuProps) {
  return (
    <View className="gap-2">
      {items.map((item) => (
        <SettingsMenuItem key={item.key} item={item} onPress={onItemPress} />
      ))}
    </View>
  );
}
