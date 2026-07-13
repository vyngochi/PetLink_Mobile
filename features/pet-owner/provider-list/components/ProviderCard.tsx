import { CheckCircle, MapPin, Star } from "lucide-react-native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ProviderItem } from "@/features/pet-owner/shared/types/provider.type";

interface ProviderCardProps {
  provider: ProviderItem;
  onPress?: () => void;
}

export function ProviderCard({ provider, onPress }: ProviderCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <Pressable
      onPress={onPress}
      className="mb-6 overflow-hidden border shadow-sm bg-card rounded-3xl border-border/50 active:opacity-90"
    >
      <View className="relative w-full h-40 bg-muted">
        <Image
          source={{ uri: provider.coverImageUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute flex items-center justify-center w-16 h-16 p-1 border-2 rounded-full shadow-sm -bottom-8 left-4 bg-card border-card">
          <Image
            source={{ uri: provider.avatarUrl }}
            className="w-full h-full rounded-full"
            resizeMode="cover"
          />
        </View>
        {provider.availability.isOpenNow && (
          <View className="absolute px-3 py-1 bg-green-500 rounded-full top-4 right-4">
            <Text className="text-xs text-white font-mbold">Đang mở cửa</Text>
          </View>
        )}
      </View>

      <View className="px-4 pt-10 pb-5">
        <View className="flex-row items-center gap-1 mb-1">
          <Text className="text-lg font-mbold text-foreground">
            {provider.businessName}
          </Text>
          {provider.isVerified && (
            <CheckCircle
              size={16}
              className="text-primary"
              fill="currentColor"
              color="white"
            />
          )}
        </View>

        <View className="flex-row items-center gap-2 mb-3">
          <View className="flex-row items-center gap-1">
            <Star size={14} className="text-[#df852a]" fill="#df852a" />
            <Text className="text-sm font-mbold text-foreground">
              {provider.rating.average}
            </Text>
          </View>
          <Text className="text-sm text-muted-foreground">|</Text>
          <View className="flex-row items-center gap-1">
            <MapPin size={14} className="text-muted-foreground" />
            <Text className="text-sm font-default text-muted-foreground">
              Cách bạn {provider.location.distanceKm}km
            </Text>
          </View>
        </View>

        <View className="px-3 py-2 mb-4 rounded-xl bg-primary/10">
          <Text className="text-sm text-primary font-mbold">
            Dịch vụ từ {formatCurrency(provider.services.priceRange.min)} -{" "}
            {formatCurrency(provider.services.priceRange.max)}
          </Text>
        </View>

        {provider.services.preview.length > 0 && (
          <View>
            <Text className="mb-2 text-sm text-muted-foreground font-mbold">
              Dịch vụ nổi bật:
            </Text>
            <View className="flex-col gap-2">
              {provider.services.preview.slice(0, 2).map((service) => (
                <View
                  key={service.id}
                  className="flex-row items-center justify-between"
                >
                  <View className="flex-row items-center gap-2">
                    <View className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                    <Text className="text-sm text-foreground font-default">
                      {service.name}
                    </Text>
                  </View>
                  <Text className="text-sm text-foreground font-mbold">
                    {formatCurrency(service.price)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
}
