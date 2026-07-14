import { getImageUrl } from "@/lib/helper/cloudinary.helper";
import { formatCurrency } from "@/lib/helper/formatCurrency";
import { Href, useRouter } from "expo-router";
import { Star } from "lucide-react-native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ProviderItem } from "../../shared/types/provider.type";

const AVATAR_SIZE = 96;

export function ClinicCard({
  provider,
  onSelect,
}: {
  provider: ProviderItem;
  onSelect: (id: string) => void;
}) {
  const avatar = getImageUrl(provider.avatarUrl);
  return (
    <Pressable
      onPress={() => onSelect(provider.id)}
      className="flex-row gap-4 p-4 border shadow-sm bg-card rounded-3xl border-border/50 active:opacity-80"
    >
      <View className="w-24 h-24 overflow-hidden rounded-2xl bg-muted shrink-0">
        <Image
          source={{ uri: avatar }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View className="flex-col justify-between flex-1 py-1">
        <View>
          <Text className="text-base font-mbold text-foreground line-clamp-1">
            {provider.businessName}
          </Text>
          <View className="flex-row items-center gap-1 mt-1">
            <Star size={16} className="text-[#df852a]" fill="#df852a" />
            <Text className="text-sm font-mbold text-foreground">
              {provider.rating.average}
            </Text>
            <Text className="ml-1 text-sm font-default text-muted-foreground">
              {provider.location.distanceKm} km
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-sm font-mbold text-primary">
            Từ {formatCurrency(provider.services.priceRange.min)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export function PopularClinicsSection({
  providers,
}: {
  providers: ProviderItem[];
}) {
  const router = useRouter();
  const onSelect = (id: string) => {
    router.push(`/pet-owner/provider/${id}` as Href);
  };
  return (
    <View className="mt-8">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-mbold text-foreground">
          Nhà cung cấp phổ biến
        </Text>
        <Pressable onPress={() => router.push("/providers")}>
          <Text className="text-sm text-primary font-mbold">Xem tất cả</Text>
        </Pressable>
      </View>
      <View className="flex-col gap-4">
        {providers.map((provider) => (
          <ClinicCard
            key={provider.id}
            provider={provider}
            onSelect={onSelect}
          />
        ))}
      </View>
    </View>
  );
}
