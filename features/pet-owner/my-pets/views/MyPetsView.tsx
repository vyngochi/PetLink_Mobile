import { useRouter, type Href } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import {
  AddPetButton,
  MyPetsHeader,
  PetCard,
} from "@/features/pet-owner/my-pets/components";
import { useGetMyPets } from "@/features/pet-owner/my-pets/hooks/useGetMyPets";
import type { Pet } from "@/features/pet-owner/my-pets/types";
import { getApiErrorMessage } from "@/lib/http";

export function MyPetsView() {
  const router = useRouter();
  const { pets, isLoading, isError, error, refetch, isRefetching } =
    useGetMyPets();

  const handleViewProfile = (pet: Pet) => {
    router.push(`/pet-owner/pet/${pet.id}` as Href);
  };

  const handleAddPet = () => {
    router.push("/pet-owner/pet/create" as Href);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="items-center py-16">
          <ActivityIndicator color={Colors.light.tint} />
        </View>
      );
    }

    if (isError) {
      return (
        <View className="items-center gap-4 py-16">
          <Text className="text-center font-default text-[14px] leading-[21px] text-muted-foreground">
            {getApiErrorMessage(error, {
              fallback: "Không tải được danh sách thú cưng",
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
        </View>
      );
    }

    return (
      <View className="gap-6">
        {pets.length === 0 ? (
          <Text className="py-10 text-center font-default text-[14px] leading-[21px] text-muted-foreground">
            Bạn chưa có thú cưng nào.
          </Text>
        ) : (
          pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onViewProfile={handleViewProfile} />
          ))
        )}
        <AddPetButton onPress={handleAddPet} />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-5">
        <MyPetsHeader title="Thú cưng của tôi" onBack={() => router.back()} />
      </View>

      <ScrollView
        contentContainerClassName="px-5 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={Colors.light.tint}
          />
        }
      >
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
