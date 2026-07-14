import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";

import { getImageUrl } from "@/lib/helper/cloudinary.helper";

type PetMomentsGalleryProps = {
  petName: string;
  photos: string[];
};

export function PetMomentsGallery({ petName, photos }: PetMomentsGalleryProps) {
  if (photos.length === 0) {
    return null;
  }

  return (
    <View>
      <Text className="mb-4 font-mbold text-[18px] leading-6 text-foreground">
        Khoảnh khắc của {petName}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3"
      >
        {photos.map((photo, index) => (
          <View
            key={`${photo}-${index}`}
            className="h-32 w-32 overflow-hidden rounded-2xl shadow-sm"
          >
            <Image
              source={{ uri: getImageUrl(photo, { width: 128, height: 128 }) }}
              accessibilityLabel={`${petName} ${index + 1}`}
              contentFit="cover"
              transition={200}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
