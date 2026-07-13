import React from "react";
import { Dimensions, View } from "react-native";
import { Image } from "expo-image";

import type { PetDetail } from "@/features/pet-owner/pet-detail/types";

const { width } = Dimensions.get("window");

type PetDetailHeaderProps = {
  pet: PetDetail;
};

export function PetDetailHeader({ pet }: PetDetailHeaderProps) {
  return (
    <View style={{ width, height: Math.round(width * 1.02) }} className="bg-muted">
      <Image
        source={{ uri: pet.imageUrl }}
        accessibilityLabel={pet.name}
        contentFit="cover"
        transition={200}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}
