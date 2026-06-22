import React from "react";
import { Pressable, Text, View } from "react-native";
import { ArrowLeft } from "lucide-react-native";

import { profileColors } from "@/features/pet-owner/profile/constants/colors";

type EditProfileHeaderProps = {
  title?: string;
  onBack?: () => void;
};

export function EditProfileHeader({
  title = "Chỉnh sửa hồ sơ",
  onBack,
}: EditProfileHeaderProps) {
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
        <ArrowLeft size={24} color={profileColors.primary} />
      </Pressable>
      <Text className="flex-1 font-mbold text-[18px] leading-6 text-primary">
        {title}
      </Text>
    </View>
  );
}
