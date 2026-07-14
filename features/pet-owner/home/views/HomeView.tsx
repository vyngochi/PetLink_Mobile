import { useUserLocation } from "@/features/pet-owner/shared/hooks/useUserLocation";
import { toApiCoords } from "@/features/pet-owner/shared/utils/coordinates";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useGetProviders } from "../../provider-list/hooks/useGetProviders";
import { JoinBanner } from "../components/JoinBanner";
import { PetTipsSection } from "../components/PetTipsSection";
import { PopularClinicsSection } from "../components/PopularClinicsSection";
import { QuickServicesSection } from "../components/QuickServicesSection";
import { SearchBar } from "../components/SearchBar";
import { PET_CARE_TIPS } from "../constants/home-mock";

export interface HomeViewProps {
  isLoggedIn?: boolean;
}

export function HomeView({ isLoggedIn = false }: HomeViewProps) {
  const router = useRouter();
  const { coords } = useUserLocation();
  const [refreshing, setRefreshing] = useState(false);

  const onJoinPress = () => {
    router.push({ pathname: "/(auth)/login" });
  };

  const { providers, refetch } = useGetProviders({ ...toApiCoords(coords) });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const populars = providers.filter(
    (provider) =>
      provider.rating.average > 4 || provider.location.distanceKm < 15,
  );

  const quickService = Array.from(
    new Map(
      providers
        .flatMap((provider) => provider.services.categories)
        .map((service) => [service, service]),
    ).values(),
  );

  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="px-5">
        <SearchBar />
        <QuickServicesSection services={quickService} />

        {!isLoggedIn && <JoinBanner onJoinPress={onJoinPress} />}

        <PopularClinicsSection providers={populars} />

        <PetTipsSection tips={PET_CARE_TIPS} />
      </View>
    </ScrollView>
  );
}
