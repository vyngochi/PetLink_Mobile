import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { CircleUserRound } from "lucide-react-native";

import { profileColors } from "@/features/pet-owner/profile/constants/colors";

type ProfileAvatarProps = {
  uri?: string;
  size: number;
};

export function ProfileAvatar({ uri, size }: ProfileAvatarProps) {
  return (
    <View
      className="items-center justify-center overflow-hidden rounded-full bg-muted"
      style={{ width: size, height: size }}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size }}
          contentFit="cover"
          transition={200}
          accessibilityLabel="Ảnh đại diện"
        />
      ) : (
        <CircleUserRound size={size * 0.6} color={profileColors.outline} />
      )}
    </View>
  );
}
