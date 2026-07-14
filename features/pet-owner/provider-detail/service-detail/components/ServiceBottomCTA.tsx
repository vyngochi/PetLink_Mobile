import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ServiceDetailItem } from "../types/service-detail.type";

interface ServiceBottomCTAProps {
  service: ServiceDetailItem;
  onBookPress: () => void;
}

export function ServiceBottomCTA({
  service,
  onBookPress,
}: ServiceBottomCTAProps) {
  const insets = useSafeAreaInsets();
  const { protectedRoute } = useProtectedRoute();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleBookPress = () => {
    protectedRoute({
      callback: onBookPress,
      redirect: () => {
        router.push("/(auth)/login");
      },
      intendedRoute: `/pet-owner/booking/create?serviceId=${service.id}` as any,
    });
  };

  return (
    <View
      className="bg-card border-t border-border/50 px-5 pt-4 flex-row items-center justify-between"
      style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 20 }}
    >
      <View>
        <Text className="text-xs text-muted-foreground font-default mb-0.5">
          Tổng cộng
        </Text>
        <Text className="text-xl font-mbold text-primary">
          {formatCurrency(service.price)}
        </Text>
      </View>

      <Pressable
        onPress={handleBookPress}
        className="bg-primary px-8 py-3.5 rounded-full active:opacity-90 shadow-sm"
      >
        <Text className="text-white font-mbold text-base">Đặt lịch ngay</Text>
      </Pressable>
    </View>
  );
}
