import React from "react";
import { Text, View } from "react-native";

type ChatDateSeparatorProps = {
  label: string;
};

export function ChatDateSeparator({ label }: ChatDateSeparatorProps) {
  return (
    <View className="items-center">
      <Text className="rounded-full bg-muted px-3 py-1 font-default text-[11px] leading-4 text-muted-foreground">
        {label}
      </Text>
    </View>
  );
}
