import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";

const logo = require("@/assets/images/PetLink/PetLink.png");

type AuthHeaderProps = {
  size?: number;
};

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
