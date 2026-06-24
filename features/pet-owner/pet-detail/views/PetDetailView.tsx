import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import {
  HealthRemindersSection,
  MedicalHistorySection,
  PetDetailFooter,
  PetDetailHeader,
  PetDetailTopNav,
  PetIdentitySection,
  PetMomentsGallery,
  PetStatsGrid,
} from "@/features/pet-owner/pet-detail/components";
import { usePetDetail } from "@/features/pet-owner/pet-detail/hooks/usePetDetail";

type PetDetailViewProps = {
  petId: string;
};

export function PetDetailView({ petId }: PetDetailViewProps) {
  const router = useRouter();
  const { pet } = usePetDetail(petId);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!pet) {
    return (
      <View className="flex-1 items-center justify-center gap-4 bg-background px-5">
        <Text className="font-mbold text-[18px] text-muted-foreground">
          Không tìm thấy thú cưng
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="rounded-full bg-primary px-6 py-3"
        >
          <Text className="font-mbold text-primary-foreground">Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <PetDetailHeader pet={pet} />

        <View className="-mt-6 rounded-t-[24px] bg-background">
          <View className="items-center pt-3">
            <View className="h-1.5 w-12 rounded-full bg-border" />
          </View>

          <View className="gap-8 px-5 pb-6 pt-6">
            <PetIdentitySection pet={pet} />
            <PetStatsGrid pet={pet} />
            <HealthRemindersSection reminder={pet.healthReminder} />
            <MedicalHistorySection
              criticalNote={pet.criticalNote}
              records={pet.medicalRecords}
            />
            <PetMomentsGallery petName={pet.name} photos={pet.photos} />
          </View>
        </View>
      </ScrollView>

      <PetDetailTopNav
        isFavorite={isFavorite}
        onBack={() => router.back()}
        onToggleFavorite={() => setIsFavorite((prev) => !prev)}
      />

      <PetDetailFooter
        onEditProfile={() => router.push("/pet-owner/edit-profile")}
        onBookVet={() => router.push("/(tabs)/booking")}
      />
    </View>
  );
}
