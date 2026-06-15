import { Image } from "expo-image";
import { View } from "react-native";

import { cn } from "@/lib/utils";

export interface AuthBrandHeaderProps {
  readonly className?: string;
  /** Logo width/height in px (default 128). */
  readonly size?: number;
}

// Full PetLink brand lockup (illustration + wordmark) on a transparent
// background — use the light-background variant for the auth screens.
const PETLINK_LOGO = require("@/assets/images/PetLink/PetLink.png");

/** Centered PetLink logo, shared by the login and register screens. */
export function AuthBrandHeader({ className, size = 128 }: AuthBrandHeaderProps) {
  return (
    <View className={cn("items-center", className)}>
      <Image
        source={PETLINK_LOGO}
        style={{ width: size, height: size }}
        contentFit="contain"
        accessibilityLabel="PetLink"
      />
    </View>
  );
}
