import { getImageUrl } from "@/lib/helper/cloudinary.helper";
import { Image } from "expo-image";
import { Plus } from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import type { BookingPetOption } from "@/features/pet-owner/booking-flow/shared/types";
import { cn } from "@/lib/utils";

interface PetSelectorProps {
  pets: BookingPetOption[];
  selectedPetId: string | null;
  onSelect: (petId: string) => void;
  onAddPet: () => void;
}

export function PetSelector({
  pets,
  selectedPetId,
  onSelect,
  onAddPet,
}: PetSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-4 px-5"
    >
      {pets.map((pet) => {
        const selected = pet.id === selectedPetId;

        return (
          <Pressable
            key={pet.id}
            onPress={() => onSelect(pet.id)}
            className="items-center active:opacity-80"
          >
            <View
              className={cn(
                "h-20 w-20 rounded-2xl border-2 p-1",
                selected ? "border-primary bg-primary/10" : "border-transparent bg-card",
              )}
            >
              <Image
                source={{
                  uri: getImageUrl(pet.imageUrl, { width: 80, height: 80 }),
                }}
                accessibilityLabel={pet.name}
                contentFit="cover"
                transition={200}
                style={{ width: "100%", height: "100%", borderRadius: 12 }}
              />
            </View>
            <Text
              className={cn(
                "mt-2 font-mbold text-[13px]",
                selected ? "text-primary" : "text-muted-foreground",
              )}
            >
              {pet.name}
            </Text>
          </Pressable>
        );
      })}

      <Pressable onPress={onAddPet} className="items-center active:opacity-80">
        <View className="h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30">
          <Plus size={22} className="text-muted-foreground" />
        </View>
        <Text className="mt-2 font-default text-[13px] text-muted-foreground">
          Thêm
        </Text>
      </Pressable>
    </ScrollView>
  );
}
