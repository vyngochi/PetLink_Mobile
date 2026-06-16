import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";

const logo = require("@/assets/images/PetLink/PetLink.png");

type AuthHeaderProps = {
  /** Logo size in px. Login uses a larger mark than the register card. */
  size?: number;
};

/** PetLink brand logo: the cat + dog wordmark. */
export function AuthHeader({ size = 160 }: AuthHeaderProps) {
  return (
    <View className="items-center">
      <Image
        source={logo}
        style={{ width: size, height: size }}
        contentFit="contain"
        accessibilityLabel="PetLink"
      />
    </View>
  );
}
