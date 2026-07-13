import React, { useState } from "react";
import { Text, TextInput, type TextInputProps, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";

import { profileColors } from "@/features/pet-owner/profile/constants/colors";

type ProfileFormFieldProps = TextInputProps & {
  label: string;
  trailingIcon?: LucideIcon;
  error?: string;
  helperText?: string;
  vietnamese?: boolean;
};

const vietnameseInputProps: TextInputProps = {
  autoCorrect: false,
  spellCheck: false,
  autoComplete: "off",
  textContentType: "none",
  keyboardType: "default",
  importantForAutofill: "no",
};

export function ProfileFormField({
  label,
  trailingIcon: TrailingIcon,
  error,
  helperText,
  vietnamese = false,
  ...inputProps
}: ProfileFormFieldProps) {
  const [focused, setFocused] = useState(false);
  const disabled = inputProps.editable === false;

  return (
    <View className="gap-2">
      <Text className="ml-1 font-mbold text-[14px] leading-5 text-foreground">
        {label}
      </Text>

      <View
        className={`h-14 flex-row items-center rounded-xl border px-4 ${
          disabled ? "bg-muted opacity-70" : "bg-card"
        }`}
        style={{
          borderColor: error
            ? profileColors.error
            : focused
              ? profileColors.primary
              : profileColors.border,
        }}
      >
        <TextInput
          className={`h-full flex-1 font-default text-[16px] ${
            disabled ? "text-muted-foreground" : "text-card-foreground"
          }`}
          placeholderTextColor={profileColors.outline}
          onFocus={(e) => {
            setFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            inputProps.onBlur?.(e);
          }}
          {...inputProps}
          {...(vietnamese ? vietnameseInputProps : null)}
        />
        {TrailingIcon ? (
          <TrailingIcon size={20} color={profileColors.primary} />
        ) : null}
      </View>

      {error ? (
        <Text className="ml-1 font-default text-[12px] leading-4 text-destructive">
          {error}
        </Text>
      ) : helperText ? (
        <Text className="ml-1 font-default text-[12px] leading-4 text-muted-foreground">
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}
