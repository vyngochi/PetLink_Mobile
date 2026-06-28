import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { CheckCircle2 } from "lucide-react-native";

import { petEditColors } from "@/features/pet-owner/pet-edit/constants/colors";

type SavePetButtonProps = {
  label: string;
  onPress?: () => void;
  saving?: boolean;
  saved?: boolean;
};

export function SavePetButton({
  label,
  onPress,
  saving = false,
  saved = false,
}: SavePetButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={saving}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        transform: [{ scale: pressed && !saving ? 0.98 : 1 }],
        opacity: saving ? 0.7 : 1,
        shadowColor: petEditColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 4,
      })}
      className="h-14 items-center justify-center rounded-full bg-primary"
    >
      {saving ? (
        <ActivityIndicator color={petEditColors.onPrimary} />
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          <CheckCircle2 size={20} color={petEditColors.onPrimary} />
          <Text className="font-mbold text-[16px] leading-6 text-primary-foreground">
            {saved ? "Đã cập nhật" : label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
