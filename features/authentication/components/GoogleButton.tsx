import React from "react";
import { Pressable, Text } from "react-native";
import { GoogleIcon } from "./GoogleIcon";

type GoogleButtonProps = {
  label?: string;
  onPress?: () => void;
};

export function GoogleButton({
  label = "Đăng nhập với Google",
  onPress,
}: GoogleButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.97 : 1 }],
      })}
      className="flex-row items-center justify-center h-12 gap-3 border rounded-full border-border bg-card"
    >
      <GoogleIcon size={20} />
      <Text className="font-mbold text-[14px] leading-5 text-muted-foreground">
        {label}
      </Text>
    </Pressable>
  );
}
