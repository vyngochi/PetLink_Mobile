import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Lock } from "lucide-react-native";

import { Colors } from "@/constants/theme";

type AddPaymentMethodButtonProps = {
  label: string;
  onPress?: () => void;
  saving?: boolean;
};

export function AddPaymentMethodButton({
  label,
  onPress,
  saving = false,
}: AddPaymentMethodButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={saving}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        transform: [{ scale: pressed && !saving ? 0.98 : 1 }],
        opacity: saving ? 0.7 : 1,
      })}
      className="h-14 flex-row items-center justify-center gap-2 rounded-full bg-primary shadow-sm"
    >
      {saving ? (
        <ActivityIndicator color={Colors.light.background} />
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          <Lock size={18} color={Colors.light.background} />
          <Text className="font-mbold text-[16px] leading-6 text-primary-foreground">
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
