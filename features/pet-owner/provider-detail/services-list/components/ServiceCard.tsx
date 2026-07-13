import { Clock } from "lucide-react-native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ProviderServicePreview } from "../../../provider-list/types/provider.type";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useRouter } from "expo-router";

interface ServiceCardProps {
  service: ProviderServicePreview;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const router = useRouter();
  const { protectedRoute } = useProtectedRoute();

  const handlePress = () =>
    protectedRoute({
      callback: () => {
        router.push({
          pathname: "/pet-owner/service/[id]",
          params: { id: service.id },
        });
      },
      redirect: () => router.push("/(auth)/login"),
      intendedRoute: `/pet-owner/service/${service.id}`,
    });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <Pressable
      onPress={handlePress}
      className="flex-1 m-2 overflow-hidden border shadow-sm bg-card rounded-2xl border-border/50 active:opacity-90"
    >
      <View className="w-full h-32 bg-muted">
        <Image
          source={{ uri: service.thumbnailUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View className="flex-1 p-3">
        <Text
          className="mb-1 text-base text-foreground font-mbold line-clamp-2 min-h-12"
          numberOfLines={2}
        >
          {service.name}
        </Text>

        {service.description && (
          <Text
            className="mb-2 text-xs text-muted-foreground font-default line-clamp-2"
            numberOfLines={2}
          >
            {service.description}
          </Text>
        )}

        <View className="flex-row items-center gap-1 mb-2">
          <Clock size={12} className="text-muted-foreground" />
          <Text className="text-xs text-muted-foreground font-default">
            {service.durationMinutes} phút
          </Text>
        </View>

        <Text className="mt-auto text-sm text-primary font-mbold">
          {formatCurrency(service.price)}
        </Text>
      </View>
    </Pressable>
  );
}
