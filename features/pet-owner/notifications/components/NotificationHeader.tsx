import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { Colors } from "@/constants/theme";

type NotificationHeaderProps = {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
};

export function NotificationHeader({
  title,
  onBack,
  right,
}: NotificationHeaderProps) {
  return (
    <View className="h-12 flex-row items-center justify-between gap-2">
      <View className="flex-1 flex-row items-center gap-2">
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          hitSlop={8}
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.9 : 1 }],
          })}
          className="h-10 w-10 items-center justify-center rounded-full"
        >
          <ChevronLeft size={24} color={Colors.light.tint} />
        </Pressable>
        <Text
          className="flex-1 font-mbold text-[20px] leading-7 text-primary"
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
      {right}
    </View>
  );
}
