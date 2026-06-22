import React from "react";
import { Pressable, Text } from "react-native";
import { LogOut } from "lucide-react-native";

import { profileColors } from "@/features/pet-owner/profile/constants/colors";

type LogoutButtonProps = {
  onPress?: () => void;
};

export function LogoutButton({ onPress }: LogoutButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Đăng xuất"
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.95 : 1 }] })}
      className="flex-row items-center gap-2 self-center rounded-full border border-destructive/30 bg-destructive/10 px-8 py-3"
    >
      <LogOut size={20} color={profileColors.error} />
      <Text className="font-mbold text-[14px] leading-5 text-destructive">
        Đăng xuất
      </Text>
    </Pressable>
  );
}
