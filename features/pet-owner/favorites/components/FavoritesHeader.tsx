import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { Colors } from "@/constants/theme";

type FavoritesHeaderProps = {
  title: string;
  onBack?: () => void;
};

export function FavoritesHeader({ title, onBack }: FavoritesHeaderProps) {
  return (
    <View className="h-12 flex-row items-center gap-2">
      <Pressable
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Quay lại"
        hitSlop={8}
        style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.9 : 1 }] })}
        className="h-10 w-10 items-center justify-center rounded-full"
      >
        <ChevronLeft size={24} color={Colors.light.tint} />
      </Pressable>
      <Text className="font-mbold text-[20px] leading-7 text-foreground">
        {title}
      </Text>
    </View>
  );
}
