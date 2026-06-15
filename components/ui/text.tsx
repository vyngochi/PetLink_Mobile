import { Text as RNText, type TextProps as RNTextProps } from "react-native";

import { cn } from "@/lib/utils";

export type TextProps = Readonly<RNTextProps>;

/**
 * System-level text primitive. Applies the PetLink base font (Montserrat)
 * and default foreground color so screens never style raw <Text> directly.
 */
export function Text({ className, ...props }: TextProps) {
  return (
    <RNText
      className={cn("font-default text-base text-foreground", className)}
      {...props}
    />
  );
}
