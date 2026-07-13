import { useRouter, type Href } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
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
import { getApiErrorMessage } from "@/lib/http";

type PetDetailViewProps = {
  petId: string;
};

export function PetDetailView({ petId }: PetDetailViewProps) {
  const router = useRouter();
  const { pet, isLoading, isError, error, refetch } = usePetDetail(petId);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color={Colors.light.tint} />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center gap-4 bg-background px-5">
        <Text className="text-center font-default text-[14px] leading-[21px] text-muted-foreground">
          {getApiErrorMessage(error, {
            fallback: "Không tải được thông tin thú cưng",
            network: "Không có kết nối mạng. Vui lòng thử lại.",
          })}
        </Text>
        <Pressable
          onPress={() => refetch()}
          accessibilityRole="button"
          accessibilityLabel="Thử lại"
          className="h-12 items-center justify-center rounded-full bg-primary px-8"
        >
          <Text className="font-mbold text-[14px] leading-5 text-primary-foreground">
            Thử lại
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          className="h-12 items-center justify-center px-8"
        >
          <Text className="font-mbold text-[14px] leading-5 text-muted-foreground">
            Quay lại
          </Text>
        </Pressable>
      </View>
    );
  }

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

      <PetDetailTopNav onBack={() => router.back()} />

      <PetDetailFooter
        onEditProfile={() =>
          router.push(`/pet-owner/pet/${pet.id}/edit` as Href)
        }
        onBookVet={() => router.push("/(tabs)/booking")}
      />
    </View>
  );
}
