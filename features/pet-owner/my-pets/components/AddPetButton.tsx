import React from "react";
import { Pressable, Text, View } from "react-native";
import { Plus } from "lucide-react-native";

import { Colors } from "@/constants/theme";

type AddPetButtonProps = {
  onPress?: () => void;
};

export function AddPetButton({ onPress }: AddPetButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Thêm thú cưng"
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.99 : 1 }] })}
      className="items-center justify-center gap-3 rounded-[24px] border-2 border-dashed border-border p-8"
    >
      <View className="h-14 w-14 items-center justify-center rounded-full bg-muted">
        <Plus size={28} color={Colors.light.icon} />
      </View>
      <Text className="font-mbold text-[18px] leading-6 text-muted-foreground">
        Thêm thú cưng
      </Text>
    </Pressable>
  );
}
