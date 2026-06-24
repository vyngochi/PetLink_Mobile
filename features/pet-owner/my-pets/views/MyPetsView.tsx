import { useRouter, type Href } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  AddPetButton,
  MyPetsHeader,
  PetCard,
} from "@/features/pet-owner/my-pets/components";
import { usePets } from "@/features/pet-owner/my-pets/hooks/usePets";
import type { Pet } from "@/features/pet-owner/my-pets/types";

export function MyPetsView() {
  const router = useRouter();
  const { pets } = usePets();

  const handleViewProfile = (pet: Pet) => {
    router.push(`/pet-owner/pet/${pet.id}` as Href);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-5">
        <MyPetsHeader title="Thú cưng của tôi" onBack={() => router.back()} />
      </View>

      <ScrollView
        contentContainerClassName="px-5 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-6">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onViewProfile={handleViewProfile}
            />
          ))}
          <AddPetButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
