import React, { useState } from "react";
import { Text, TextInput, type TextInputProps, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";

import { profileColors } from "@/features/pet-owner/profile/constants/colors";

type ProfileFormFieldProps = TextInputProps & {
  label: string;
  trailingIcon?: LucideIcon;
  error?: string;
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
  vietnamese = false,
  ...inputProps
}: ProfileFormFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="gap-2">
      <Text className="ml-1 font-mbold text-[14px] leading-5 text-foreground">
        {label}
      </Text>

      <View
        className="h-14 flex-row items-center rounded-xl border bg-card px-4"
        style={{
          borderColor: error
            ? profileColors.error
            : focused
              ? profileColors.primary
              : profileColors.border,
        }}
      >
        <TextInput
          className="h-full flex-1 font-default text-[16px] text-card-foreground"
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
      ) : null}
    </View>
  );
}
