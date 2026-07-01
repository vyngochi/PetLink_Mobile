import React from "react";
import { Pressable, Text } from "react-native";
import { CirclePlus } from "lucide-react-native";

import { Colors } from "@/constants/theme";

type AddCardButtonProps = {
  onPress?: () => void;
};

export function AddCardButton({ onPress }: AddCardButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Thêm thẻ mới"
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.99 : 1 }] })}
      className="flex-row items-center justify-center gap-2 rounded-[16px] border-2 border-dashed border-border p-4"
    >
      <CirclePlus size={20} color={Colors.light.tint} />
      <Text className="font-mbold text-[14px] leading-5 text-primary">
        Thêm thẻ mới
      </Text>
    </Pressable>
  );
}
