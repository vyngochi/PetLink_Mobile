import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  AddPetButton,
  MyPetsHeader,
  PetCard,
} from "@/features/pet-owner/my-pets/components";
import { usePets } from "@/features/pet-owner/my-pets/hooks/usePets";

export function MyPetsView() {
  const router = useRouter();
  const { pets } = usePets();

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
            <PetCard key={pet.id} pet={pet} />
          ))}
          <AddPetButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
