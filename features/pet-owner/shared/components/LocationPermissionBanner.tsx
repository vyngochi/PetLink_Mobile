import { MapPin } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface LocationPermissionBannerProps {
  onEnable: () => void;
  message?: string;
  className?: string;
}

export function LocationPermissionBanner({
  onEnable,
  message = "Cho phép định vị để xem khoảng cách và chỉ đường",
  className,
}: LocationPermissionBannerProps) {
  return (
    <View
      className={`flex-row items-center gap-3 px-4 py-3 border rounded-xl bg-card border-border/50 ${className ?? ""}`}
    >
      <MapPin size={18} className="text-primary" />

      <Text className="flex-1 text-sm text-muted-foreground font-default">
        {message}
      </Text>

      <Pressable
        onPress={onEnable}
        accessibilityRole="button"
        accessibilityLabel="Bật định vị"
        className="px-4 py-2 rounded-full bg-primary active:opacity-90"
      >
        <Text className="text-xs text-white font-mbold">Bật</Text>
      </Pressable>
    </View>
  );
}
