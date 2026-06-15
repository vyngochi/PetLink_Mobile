import type { LucideIcon } from "lucide-react-native";
import { useState } from "react";
import { Pressable, TextInput, View, type TextInputProps } from "react-native";

import { Text } from "@/components/ui/text";
import { Eye, EyeOff } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface FormFieldRightLabel {
  readonly text: string;
  readonly onPress?: () => void;
}

export interface FormFieldProps extends Readonly<TextInputProps> {
  readonly label: string;
  /** Optional leading icon (lucide). */
  readonly icon?: LucideIcon;
  /** Optional action rendered at the right of the label row (e.g. "Forgot Password?"). */
  readonly rightLabel?: FormFieldRightLabel;
  /** Renders a masked field with a visibility toggle. */
  readonly password?: boolean;
  readonly containerClassName?: string;
  /** Override the input surface (e.g. `bg-card` when sitting on a tinted background). */
  readonly fieldClassName?: string;
}

/**
 * Labeled text field used across the auth screens. Supports an optional leading
 * icon, a secondary right-aligned label action, and a password visibility toggle.
 */
export function FormField({
  label,
  icon: Icon,
  rightLabel,
  password = false,
  containerClassName,
  fieldClassName,
  className,
  ...inputProps
}: FormFieldProps) {
  const [visible, setVisible] = useState(false);
  const ToggleIcon = visible ? EyeOff : Eye;

  return (
    <View className={cn("gap-2", containerClassName)}>
      <View className="flex-row items-center justify-between px-1">
        <Text className="text-sm font-bold text-muted-foreground">{label}</Text>
        {rightLabel ? (
          <Pressable onPress={rightLabel.onPress} hitSlop={8}>
            <Text className="text-xs font-bold text-primary">
              {rightLabel.text}
            </Text>
          </Pressable>
        ) : null}
      </View>

      <View
        className={cn(
          "h-14 flex-row items-center gap-3 rounded-xl border border-input bg-background px-4",
          fieldClassName,
        )}
      >
        {Icon ? <Icon size={20} className="text-muted-foreground" /> : null}
        <TextInput
          className={cn(
            "h-full flex-1 font-default text-base text-foreground placeholder:text-muted-foreground",
            className,
          )}
          secureTextEntry={password && !visible}
          {...inputProps}
        />
        {password ? (
          <Pressable onPress={() => setVisible((v) => !v)} hitSlop={8}>
            <ToggleIcon size={20} className="text-muted-foreground" />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
