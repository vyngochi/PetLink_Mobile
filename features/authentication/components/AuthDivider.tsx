import React from "react";
import { Text, View } from "react-native";

type AuthDividerProps = {
  label?: string;
};

/** Horizontal rule with centered "or continue with" label. */
export function AuthDivider({ label = "or continue with" }: AuthDividerProps) {
  return (
    <View className="flex-row items-center">
      <View className="h-px flex-1 bg-border" />
      <Text className="mx-4 font-default text-[12px] leading-4 text-muted-foreground">
        {label}
      </Text>
      <View className="h-px flex-1 bg-border" />
    </View>
  );
}
