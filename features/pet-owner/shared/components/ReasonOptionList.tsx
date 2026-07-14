import React from "react";
import { Pressable, Text, View } from "react-native";

export type ReasonOption = {
  value: string;
  label: string;
};

type ReasonOptionListProps = {
  options: readonly ReasonOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function ReasonOptionList({
  options,
  value,
  onChange,
  disabled = false,
}: ReasonOptionListProps) {
  return (
    <View className="gap-2">
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            disabled={disabled}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected, disabled }}
            accessibilityLabel={option.label}
            className={`flex-row items-center gap-3 rounded-xl border px-4 py-3 active:opacity-70 ${
              selected ? "border-primary bg-primary/5" : "border-border bg-card"
            }`}
          >
            <View
              className={`h-5 w-5 items-center justify-center rounded-full border-2 ${
                selected ? "border-primary" : "border-border"
              }`}
            >
              {selected ? (
                <View className="h-2.5 w-2.5 rounded-full bg-primary" />
              ) : null}
            </View>
            <Text
              className={`flex-1 font-default text-[15px] leading-5 ${
                selected ? "text-foreground" : "text-card-foreground"
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
