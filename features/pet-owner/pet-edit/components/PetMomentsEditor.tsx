import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { ImagePlus, X } from "lucide-react-native";

import { petEditColors } from "@/features/pet-owner/pet-edit/constants/colors";

type PetMomentsEditorProps = {
  petName: string;
  photos: string[];
  onAddPhoto?: () => void;
  onRemovePhoto?: (photo: string) => void;
};

export function PetMomentsEditor({
  petName,
  photos,
  onAddPhoto,
  onRemovePhoto,
}: PetMomentsEditorProps) {
  return (
    <View className="-mx-5">
      <View className="mb-4 flex-row items-center justify-between px-5">
        <Text className="font-mbold text-[18px] leading-6 text-foreground">
          Khoảnh khắc của {petName}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-4 px-5"
      >
        <Pressable
          onPress={onAddPhoto}
          accessibilityRole="button"
          accessibilityLabel="Thêm ảnh"
          style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.95 : 1 }] })}
          className="h-24 w-24 items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-border bg-muted"
        >
          <ImagePlus size={24} color={petEditColors.outline} />
          <Text className="font-mbold text-[10px] uppercase tracking-wider text-muted-foreground">
            Thêm
          </Text>
        </Pressable>

        {photos.map((photo, index) => (
          <View
            key={`${photo}-${index}`}
            className="h-24 w-24 overflow-hidden rounded-2xl bg-muted shadow-sm"
          >
            <Image
              source={{ uri: photo }}
              accessibilityLabel={`${petName} ${index + 1}`}
              contentFit="cover"
              transition={200}
              style={{ width: "100%", height: "100%" }}
            />
            <Pressable
              onPress={() => onRemovePhoto?.(photo)}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel="Xoá ảnh"
              className="absolute right-1 top-1 h-6 w-6 items-center justify-center rounded-full bg-background/80"
            >
              <X size={14} color={petEditColors.error} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
