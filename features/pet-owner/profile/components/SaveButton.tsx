import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Check } from "lucide-react-native";

import { profileColors } from "@/features/pet-owner/profile/constants/colors";

type SaveButtonProps = {
  label: string;
  onPress?: () => void;
  saving?: boolean;
  saved?: boolean;
};

export function SaveButton({
  label,
  onPress,
  saving = false,
  saved = false,
}: SaveButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={saving}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        transform: [{ scale: pressed && !saving ? 0.98 : 1 }],
        opacity: saving ? 0.7 : 1,
        shadowColor: profileColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 4,
      })}
      className="h-14 items-center justify-center rounded-full bg-primary"
    >
      {saving ? (
        <ActivityIndicator color={profileColors.onPrimary} />
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          {saved ? <Check size={20} color={profileColors.onPrimary} /> : null}
          <Text className="font-mbold text-[16px] leading-6 text-primary-foreground">
            {saved ? "Đã lưu" : label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
