import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";
import { Eye, EyeOff, type LucideIcon } from "lucide-react-native";

import { authColors } from "@/features/authentication/constants/colors";
import { cn } from "@/lib/utils";

type AuthInputProps = TextInputProps & {
  label?: string;
  icon: LucideIcon;
  secure?: boolean;
  error?: string;
  fillClassName?: string;
};

export function AuthInput({
  label,
  icon: Icon,
  secure = false,
  error,
  fillClassName = "bg-card",
  ...inputProps
}: AuthInputProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secure);

  const accent = error
    ? authColors.error
    : focused
      ? authColors.primary
      : authColors.outline;

  return (
    <View className="gap-2">
      {label ? (
        <Text className="ml-1 font-bold text-[14px] leading-5 text-muted-foreground">
          {label}
        </Text>
      ) : null}

      <View
        className={cn(
          "h-12 flex-row items-center rounded-xl border px-3",
          fillClassName,
        )}
        style={{
          borderColor: error
            ? authColors.error
            : focused
              ? authColors.primary
              : authColors.border,
        }}
      >
        <Icon size={20} color={accent} />
        <TextInput
          className="ml-2 h-full flex-1 font-default text-[14px] text-card-foreground"
          placeholderTextColor={authColors.outline}
          secureTextEntry={hidden}
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
        {secure ? (
          <Pressable
            hitSlop={8}
            onPress={() => setHidden((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Hiện mật khẩu" : "Ẩn mật khẩu"}
          >
            {hidden ? (
              <Eye size={20} color={authColors.outline} />
            ) : (
              <EyeOff size={20} color={authColors.primary} />
            )}
          </Pressable>
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
