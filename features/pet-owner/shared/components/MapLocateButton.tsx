import { LocateFixed } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Colors } from "@/constants/theme";

interface MapLocateButtonProps {
  onPress: () => void;
  isLocating?: boolean;
  className?: string;
}

export function MapLocateButton({
  onPress,
  isLocating = false,
  className,
}: MapLocateButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLocating}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Về vị trí của tôi"
      className={`h-11 w-11 items-center justify-center rounded-full border bg-card border-border/50 shadow-sm active:opacity-80 ${className ?? ""}`}
    >
      {isLocating ? (
        <ActivityIndicator size="small" color={Colors.light.tint} />
      ) : (
        <View>
          <LocateFixed size={20} className="text-primary" />
        </View>
      )}
    </Pressable>
  );
}
