import { useRouter, type Href } from "expo-router";
import { Clock, MapPin, Star } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { toast } from "@/components/toast";
import {
  EmptyFavorites,
  FavoriteCard,
  FavoritesHeader,
  FavoritesSuggestions,
  FavoritesTabs,
} from "@/features/pet-owner/favorites/components";
import { useFavorites } from "@/features/pet-owner/favorites/hooks/useFavorites";
import type {
  FavoriteProvider,
  FavoriteService,
  FavoriteTab,
} from "@/features/pet-owner/favorites/types";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);

export function FavoritesView() {
  const router = useRouter();
  const { providers, services, removeProvider, removeService } = useFavorites();
  const [tab, setTab] = useState<FavoriteTab>("provider");

  const handleRemoveProvider = (provider: FavoriteProvider) => {
    removeProvider(provider.id);
    toast.success("Đã bỏ khỏi mục yêu thích", {
      position: "bottom",
      duration: 600,
    });
  };

  const handleRemoveService = (service: FavoriteService) => {
    removeService(service.id);
    toast.success("Đã bỏ khỏi mục yêu thích", {
      position: "bottom",
      duration: 600,
    });
  };

  const renderProviderMeta = (provider: FavoriteProvider) => (
    <View className="flex-row items-center gap-4">
      <View className="flex-row items-center gap-1">
        <Star size={14} color="#df852a" fill="#df852a" />
        <Text className="font-mbold text-[12px] leading-4 text-foreground">
          {provider.rating}
        </Text>
      </View>
      <View className="flex-row items-center gap-1">
        <MapPin size={14} className="text-muted-foreground" />
        <Text className="font-default text-[12px] leading-4 text-muted-foreground">
          {provider.distanceKm} km
        </Text>
      </View>
    </View>
  );

  const renderServiceMeta = (service: FavoriteService) => (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-1">
        <Clock size={14} className="text-muted-foreground" />
        <Text className="font-default text-[12px] leading-4 text-muted-foreground">
          {service.durationMinutes} phút
        </Text>
      </View>
      <Text className="font-mbold text-[13px] leading-4 text-primary">
        {formatCurrency(service.price)}
      </Text>
    </View>
  );

  const isProviderTab = tab === "provider";
  const isEmpty = isProviderTab ? providers.length === 0 : services.length === 0;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-5">
        <FavoritesHeader title="Mục Yêu Thích" onBack={() => router.back()} />
      </View>

      <View className="px-5 pt-2">
        <FavoritesTabs
          value={tab}
          onChange={setTab}
          providerCount={providers.length}
          serviceCount={services.length}
        />
      </View>

      <ScrollView
        contentContainerClassName="px-5 pb-12 pt-5"
        showsVerticalScrollIndicator={false}
      >
        {isEmpty ? (
          <EmptyFavorites tab={tab} />
        ) : (
          <View className="gap-4">
            {isProviderTab
              ? providers.map((provider) => (
                  <FavoriteCard
                    key={provider.id}
                    imageUrl={provider.imageUrl}
                    title={provider.name}
                    subtitle={provider.category}
                    meta={renderProviderMeta(provider)}
                    onPress={() =>
                      router.push(
                        `/pet-owner/provider/${provider.id}` as Href
                      )
                    }
                    onRemove={() => handleRemoveProvider(provider)}
                  />
                ))
              : services.map((service) => (
                  <FavoriteCard
                    key={service.id}
                    imageUrl={service.imageUrl}
                    title={service.name}
                    subtitle={service.providerName}
                    meta={renderServiceMeta(service)}
                    onPress={() =>
                      router.push({
                        pathname: "/pet-owner/service/[id]",
                        params: { id: service.id },
                      })
                    }
                    onRemove={() => handleRemoveService(service)}
                  />
                ))}
          </View>
        )}

        <FavoritesSuggestions />
      </ScrollView>
    </SafeAreaView>
  );
}
