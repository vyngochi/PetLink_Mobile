import React from "react";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Camera, PawPrint } from "lucide-react-native";

import { petEditColors } from "@/features/pet-owner/pet-edit/constants/colors";
import { getImageUrl } from "@/lib/helper/cloudinary.helper";

type PetPhotoEditorProps = {
  uri?: string;
  name: string;
  onChangePhoto?: () => void;
};

export function PetPhotoEditor({ uri, name, onChangePhoto }: PetPhotoEditorProps) {
  return (
    <View className="items-center">
      <View className="rounded-full border-4 border-card bg-card shadow-sm">
        <View className="h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-muted">
          {uri ? (
            <Image
              source={{ uri: getImageUrl(uri, { width: 128, height: 128 }) }}
              style={{ width: 128, height: 128 }}
              contentFit="cover"
              transition={200}
              accessibilityLabel={`Ảnh của ${name}`}
            />
          ) : (
            <PawPrint size={56} color={petEditColors.outline} />
          )}
        </View>
        {onChangePhoto ? (
          <Pressable
            onPress={onChangePhoto}
            accessibilityRole="button"
            accessibilityLabel="Đổi ảnh thú cưng"
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
            className="absolute bottom-1 right-1 rounded-full border-2 border-card bg-primary p-2"
          >
            <Camera size={20} color={petEditColors.onPrimary} />
          </Pressable>
        ) : null}
      </View>
      <Text className="mt-4 font-mbold text-[20px] leading-7 text-foreground">
        {name.trim().length > 0 ? name : "Thú cưng"}
      </Text>
    </View>
  );
}
