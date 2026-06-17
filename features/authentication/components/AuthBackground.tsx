import React from "react";
import { View } from "react-native";

export function AuthBackground() {
  return (
    <View pointerEvents="none" className="absolute inset-0 overflow-hidden">
      <View className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-muted" />
      <View className="absolute -bottom-32 -left-28 h-[22rem] w-[22rem] rounded-full bg-muted" />
    </View>
  );
}
