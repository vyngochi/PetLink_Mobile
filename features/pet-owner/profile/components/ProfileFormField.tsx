import React, { useState } from "react";
import { Text, TextInput, type TextInputProps, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";

import { profileColors } from "@/features/pet-owner/profile/constants/colors";

type ProfileFormFieldProps = TextInputProps & {
  label: string;
  trailingIcon?: LucideIcon;
};

export function ProfileFormField({
  label,
  trailingIcon: TrailingIcon,
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
          borderColor: focused ? profileColors.primary : profileColors.border,
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
        />
        {TrailingIcon ? (
          <TrailingIcon size={20} color={profileColors.primary} />
        ) : null}
      </View>
    </View>
  );
}
