import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { authColors } from "@/features/authentication/constants/colors";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

/** Pill-shaped primary call-to-action with a press scale and loading state. */
export function PrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => ({
        transform: [{ scale: pressed && !isDisabled ? 0.97 : 1 }],
        opacity: isDisabled ? 0.7 : 1,
        shadowColor: authColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 4,
      })}
      className="h-12 items-center justify-center rounded-full bg-primary"
    >
      {loading ? (
        <ActivityIndicator color={authColors.onPrimary} />
      ) : (
        <View className="flex-row items-center justify-center">
          <Text className="font-semibold text-[16px] leading-5 text-primary-foreground">
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
