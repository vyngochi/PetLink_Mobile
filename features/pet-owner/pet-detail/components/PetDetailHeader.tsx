import React from "react";
import { Dimensions, View } from "react-native";
import { Image } from "expo-image";

import type { PetDetail } from "@/features/pet-owner/pet-detail/types";
import { getImageUrl } from "@/lib/helper/cloudinary.helper";

const { width } = Dimensions.get("window");
const HERO_HEIGHT = Math.round(width * 1.02);

type PetDetailHeaderProps = {
  pet: PetDetail;
};

export function PetDetailHeader({ pet }: PetDetailHeaderProps) {
  return (
    <View style={{ width, height: HERO_HEIGHT }} className="bg-muted">
      <Image
        source={{
          uri: getImageUrl(pet.imageUrl, { width, height: HERO_HEIGHT }),
        }}
        accessibilityLabel={pet.name}
        contentFit="cover"
        transition={200}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}
