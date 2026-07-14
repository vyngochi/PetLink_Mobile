import { useRouter, type Href } from "expo-router";
import { Clock, MapPin, Star, Trash2 } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { toast } from "@/components/toast";
import {
  EmptyFavorites,
  FavoriteCard,
  FavoritesHeader,
  FavoritesTabs,
} from "@/features/pet-owner/favorites/components";
import { useFavorites } from "@/features/pet-owner/favorites/hooks/useFavorites";
import type {
  FavoriteProvider,
  FavoriteService,
  FavoriteTab,
} from "@/features/pet-owner/favorites/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);

export function FavoritesView() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    providers,
    services,
    removeProvider,
    removeService,
    removeMultipleProviders,
    removeMultipleServices,
    clearAllProviders,
    clearAllServices,
  } = useFavorites();

  const [tab, setTab] = useState<FavoriteTab>("provider");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isProviderTab = tab === "provider";
  const isEmpty = isProviderTab
    ? providers.length === 0
    : services.length === 0;

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    setSelectedIds([]); // Clear selection when toggling
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

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

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;

    if (isProviderTab) {
      removeMultipleProviders(selectedIds);
    } else {
      removeMultipleServices(selectedIds);
    }

    setIsEditing(false);
    setSelectedIds([]);
    toast.success(`Đã xóa ${selectedIds.length} mục yêu thích`);
  };

  const handleDeleteAll = () => {
    Alert.alert(
      "Xóa tất cả",
      "Bạn có chắc chắn muốn xóa tất cả mục yêu thích trong danh sách này không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa tất cả",
          style: "destructive",
          onPress: () => {
            if (isProviderTab) {
              clearAllProviders();
            } else {
              clearAllServices();
            }
            setIsEditing(false);
            setSelectedIds([]);
            toast.success("Đã làm sạch danh sách yêu thích");
          },
        },
      ],
    );
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

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-5">
        <FavoritesHeader
          title="Mục Yêu Thích"
          onBack={() => router.back()}
          isEditing={isEditing}
          onToggleEdit={handleToggleEdit}
          hasItems={!isEmpty}
        />
      </View>

      <View className="px-5 pt-2">
        <FavoritesTabs
          value={tab}
          onChange={(v) => {
            setTab(v);
            setIsEditing(false);
            setSelectedIds([]);
          }}
          providerCount={providers.length}
          serviceCount={services.length}
        />
      </View>

      <ScrollView
        contentContainerClassName="px-5 pb-[120px] pt-5"
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
                    isEditing={isEditing}
                    isSelected={selectedIds.includes(provider.id)}
                    onSelect={() => handleSelect(provider.id)}
                    onPress={() =>
                      router.push(`/pet-owner/provider/${provider.id}` as Href)
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
                    isEditing={isEditing}
                    isSelected={selectedIds.includes(service.id)}
                    onSelect={() => handleSelect(service.id)}
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
      </ScrollView>

      {isEditing && !isEmpty && (
        <View
          className="absolute bottom-0 left-0 right-0 border-t border-border bg-card px-5 pt-4"
          style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        >
          <View className="flex-row items-center justify-between">
            <Pressable
              onPress={handleDeleteAll}
              className="px-4 py-3 active:opacity-70"
            >
              <Text className="font-mbold text-destructive">Xóa tất cả</Text>
            </Pressable>
            <Pressable
              onPress={handleDeleteSelected}
              disabled={selectedIds.length === 0}
              className={`flex-row items-center gap-2 rounded-full px-6 py-3 ${
                selectedIds.length > 0
                  ? "bg-destructive active:opacity-90"
                  : "bg-muted"
              }`}
            >
              <Trash2
                size={18}
                color={selectedIds.length > 0 ? "white" : "#a1a1aa"}
              />
              <Text
                className={`font-mbold ${
                  selectedIds.length > 0
                    ? "text-white"
                    : "text-muted-foreground"
                }`}
              >
                Xóa ({selectedIds.length})
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
