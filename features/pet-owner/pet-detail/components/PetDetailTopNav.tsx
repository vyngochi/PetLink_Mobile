import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Heart } from "lucide-react-native";

import { Colors } from "@/constants/theme";

type PetDetailTopNavProps = {
  isFavorite: boolean;
  onBack?: () => void;
  onToggleFavorite?: () => void;
};

export function PetDetailTopNav({
  isFavorite,
  onBack,
  onToggleFavorite,
}: PetDetailTopNavProps) {
  return (
    <SafeAreaView
      edges={["top"]}
      pointerEvents="box-none"
      className="absolute left-0 right-0 top-0 z-50"
    >
      <View className="flex-row items-center justify-between px-5 pt-2">
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.9 : 1 }],
          })}
          className="h-12 w-12 items-center justify-center rounded-full bg-background/80 shadow-lg"
        >
          <ChevronLeft size={24} color={Colors.light.text} />
        </Pressable>
        <Pressable
          onPress={onToggleFavorite}
          accessibilityRole="button"
          accessibilityLabel="Yêu thích"
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.9 : 1 }],
          })}
          className="h-12 w-12 items-center justify-center rounded-full bg-background/80 shadow-lg"
        >
          <Heart
            size={24}
            color={isFavorite ? "#ef4444" : Colors.light.text}
            fill={isFavorite ? "#ef4444" : "transparent"}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
