import React from "react";
import { Pressable, Text, View } from "react-native";
import { Check } from "lucide-react-native";

import { Colors } from "@/constants/theme";
import { cn } from "@/lib/utils";

type SaveCardToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
};

export function SaveCardToggle({ value, onChange, label }: SaveCardToggleProps) {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value }}
      accessibilityLabel={label}
      className="flex-row items-center gap-3 pt-1"
    >
      <View
        className={cn(
          "h-6 w-6 items-center justify-center rounded-md border",
          value ? "border-primary bg-primary" : "border-border bg-card",
        )}
      >
        {value ? <Check size={16} color={Colors.light.background} /> : null}
      </View>
      <Text className="flex-1 font-default text-[14px] leading-5 text-muted-foreground">
        {label}
      </Text>
    </Pressable>
  );
}
