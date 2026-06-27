import React, { useState } from "react";
import { Text, TextInput, type TextInputProps, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";

import { petEditColors } from "@/features/pet-owner/pet-edit/constants/colors";

type PetFormFieldProps = TextInputProps & {
  label: string;
  error?: string;
  trailingIcon?: LucideIcon;
};

export function PetFormField({
  label,
  error,
  trailingIcon: TrailingIcon,
  ...inputProps
}: PetFormFieldProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? petEditColors.error
    : focused
      ? petEditColors.primary
      : petEditColors.border;

  return (
    <View className="gap-2">
      <Text className="ml-1 font-mbold text-[14px] leading-5 text-foreground">
        {label}
      </Text>

      <View
        className="h-14 flex-row items-center rounded-xl border bg-card px-4"
        style={{ borderColor }}
      >
        <TextInput
          className="h-full flex-1 font-default text-[16px] text-card-foreground"
          placeholderTextColor={petEditColors.outline}
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
        {TrailingIcon ? (
          <TrailingIcon size={20} color={petEditColors.outline} />
        ) : null}
      </View>

      {error ? (
        <Text className="ml-1 font-default text-[12px] leading-4 text-destructive">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
