import React from "react";
import { Pressable, Text, View } from "react-native";
import { BadgeCheck, Pencil } from "lucide-react-native";

import { ProfileAvatar } from "@/features/pet-owner/profile/components/ProfileAvatar";
import { profileColors } from "@/features/pet-owner/profile/constants/colors";
import type { UserProfile } from "@/features/pet-owner/profile/types";

type ProfileInfoCardProps = {
  profile: UserProfile;
  onEditPress?: () => void;
};

export function ProfileInfoCard({
  profile,
  onEditPress,
}: ProfileInfoCardProps) {
  return (
    <View
      className="items-center rounded-[20px] border border-border bg-card p-6"
      style={{
        shadowColor: profileColors.cardShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
      }}
    >
      <View className="mb-4">
        <View className="rounded-full border-4 border-card bg-card">
          <ProfileAvatar uri={profile.avatarUrl} size={96} />
        </View>
        {profile.verified ? (
          <View className="absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-card bg-primary p-1">
            <BadgeCheck size={16} color={profileColors.onPrimary} />
          </View>
        ) : null}
      </View>

      <Text className="font-mbold text-[20px] leading-7 text-foreground">
        {profile.fullName}
      </Text>
      <Text className="mb-4 font-default text-[14px] leading-[21px] text-muted-foreground">
        {profile.email}
      </Text>

      <Pressable
        onPress={onEditPress}
        accessibilityRole="button"
        accessibilityLabel="Chỉnh sửa hồ sơ"
        style={({ pressed }) => ({
          transform: [{ scale: pressed ? 0.97 : 1 }],
          borderColor: profileColors.secondary,
        })}
        className="h-11 w-full flex-row items-center justify-center gap-2 rounded-full border-2"
      >
        <Pencil size={18} color={profileColors.secondary} />
        <Text className="font-mbold text-[14px] leading-5 text-secondary">
          Chỉnh sửa hồ sơ
        </Text>
      </Pressable>
    </View>
  );
}
