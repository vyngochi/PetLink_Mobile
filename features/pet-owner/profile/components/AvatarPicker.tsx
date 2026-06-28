import React from "react";
import { Pressable, Text, View } from "react-native";
import { Camera } from "lucide-react-native";

import { ProfileAvatar } from "@/features/pet-owner/profile/components/ProfileAvatar";
import { profileColors } from "@/features/pet-owner/profile/constants/colors";

type AvatarPickerProps = {
  uri?: string;
  onChangePhoto?: () => void;
};

export function AvatarPicker({ uri, onChangePhoto }: AvatarPickerProps) {
  return (
    <View className="items-center">
      <View className="rounded-full border-4 border-card bg-card">
        <ProfileAvatar uri={uri} size={128} />
        <Pressable
          onPress={onChangePhoto}
          accessibilityRole="button"
          accessibilityLabel="Đổi ảnh đại diện"
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.9 : 1 }],
          })}
          className="absolute bottom-1 right-1 rounded-full border-2 border-card bg-primary p-2"
        >
          <Camera size={20} color={profileColors.onPrimary} />
        </Pressable>
      </View>
      <Text className="mt-4 font-mbold text-[14px] leading-5 text-muted-foreground">
        Cập nhật ảnh đại diện
      </Text>
    </View>
  );
}
