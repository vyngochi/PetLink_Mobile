import React from "react";
import { Text, View } from "react-native";
import { PawPrint } from "lucide-react-native";

import { ProfileAvatar } from "@/features/pet-owner/profile/components/ProfileAvatar";
import { profileColors } from "@/features/pet-owner/profile/constants/colors";

type ProfileTopBarProps = {
  avatarUrl?: string;
};

export function ProfileTopBar({ avatarUrl }: ProfileTopBarProps) {
  return (
    <View className="h-12 flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <PawPrint size={24} color={profileColors.primary} />
        <Text className="font-mbold text-[20px] leading-7 text-primary">
          PetLink
        </Text>
      </View>
      <ProfileAvatar uri={avatarUrl} size={40} />
    </View>
  );
}
