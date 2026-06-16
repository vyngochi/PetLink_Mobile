import React from "react";
import { Pressable, Text } from "react-native";
import { GoogleIcon } from "./GoogleIcon";

type GoogleButtonProps = {
  label?: string;
  onPress?: () => void;
};

/** Outlined "continue with Google" social button. */
export function GoogleButton({
  label = "Google",
  onPress,
}: GoogleButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.97 : 1 }],
      })}
      className="h-touch-target flex-row items-center justify-center gap-3 rounded-full border border-outline-variant bg-surface"
    >
      <GoogleIcon size={20} />
      <Text className="font-semibold text-[14px] leading-5 text-on-surface-variant">
        {label}
      </Text>
    </Pressable>
  );
}
