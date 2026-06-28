import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { JoinBanner } from "../components/JoinBanner";
import { PetTipsSection } from "../components/PetTipsSection";
import { PopularClinicsSection } from "../components/PopularClinicsSection";
import { QuickServicesSection } from "../components/QuickServicesSection";
import { SearchBar } from "../components/SearchBar";
import {
  PET_CARE_TIPS,
  POPULAR_CLINICS,
  QUICK_SERVICES,
} from "../constants/home-mock";

export interface HomeViewProps {
  isLoggedIn?: boolean;
}

export function HomeView({ isLoggedIn = false }: HomeViewProps) {
  const router = useRouter();

  const onJoinPress = () => {
    router.push({ pathname: "/(auth)/login" });
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5">
        <SearchBar />
        <QuickServicesSection services={QUICK_SERVICES} />

        {!isLoggedIn && <JoinBanner onJoinPress={onJoinPress} />}

        <PopularClinicsSection clinics={POPULAR_CLINICS} />

        <PetTipsSection tips={PET_CARE_TIPS} />
      </View>
    </ScrollView>
  );
}
