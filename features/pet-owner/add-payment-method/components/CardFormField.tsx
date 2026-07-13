import React, { useState } from "react";
import { Text, TextInput, type TextInputProps, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";

import { Colors } from "@/constants/theme";
import { cn } from "@/lib/utils";

type CardFormFieldProps = TextInputProps & {
  label: string;
  error?: string;
  leadingIcon?: LucideIcon;
  trailing?: React.ReactNode;
};

export function CardFormField({
  label,
  error,
  leadingIcon: LeadingIcon,
  trailing,
  ...inputProps
}: CardFormFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="gap-2">
      <View className="ml-1 h-5 flex-row items-center justify-between">
        <Text className="font-mbold text-[14px] leading-5 text-foreground">
          {label}
        </Text>
        {trailing}
      </View>

      <View
        className={cn(
          "h-14 flex-row items-center gap-3 rounded-xl border bg-card px-4",
          error
            ? "border-destructive"
            : focused
              ? "border-primary"
              : "border-border",
        )}
      >
        {LeadingIcon ? (
          <LeadingIcon
            size={20}
            color={focused ? Colors.light.tint : Colors.light.icon}
          />
        ) : null}
        <TextInput
          className="h-full flex-1 font-default text-[16px] text-card-foreground"
          placeholderTextColor={Colors.light.icon}
          onFocus={(e) => {
            setFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            inputProps.onBlur?.(e);
          }}
          {...inputProps}
        />
      </View>

      {error ? (
        <Text className="ml-1 font-default text-[12px] leading-4 text-destructive">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
