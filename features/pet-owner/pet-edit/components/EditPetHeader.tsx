import React from "react";
import { Pressable, Text, View } from "react-native";
import { ArrowLeft } from "lucide-react-native";

import { petEditColors } from "@/features/pet-owner/pet-edit/constants/colors";

type EditPetHeaderProps = {
  title?: string;
  onBack?: () => void;
};

export function EditPetHeader({
  title = "Chỉnh sửa hồ sơ",
  onBack,
}: EditPetHeaderProps) {
  return (
    <View className="h-12 flex-row items-center">
      <Pressable
        onPress={onBack}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Quay lại"
        style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.95 : 1 }] })}
        className="mr-4"
      >
        <ArrowLeft size={24} color={petEditColors.primary} />
      </Pressable>
      <Text className="flex-1 font-mbold text-[18px] leading-6 text-primary">
        {title}
      </Text>
    </View>
  );
}
