import { Clock, CreditCard, MapPin } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { ProviderItem } from "@/features/pet-owner/shared/types/provider.type";

interface ProviderAboutSectionProps {
  provider: ProviderItem;
}

export function ProviderAboutSection({ provider }: ProviderAboutSectionProps) {
  return (
    <View className="px-5 py-4 bg-background">
      <Text className="mb-3 text-lg font-mbold text-foreground">
        Giới thiệu
      </Text>
      <Text className="mb-6 text-sm leading-6 text-muted-foreground font-default">
        {provider.description}
      </Text>

      <Text className="mb-3 text-lg font-mbold text-foreground">
        Thông tin liên hệ
      </Text>

      <View className="flex-row items-start gap-3 mb-4">
        <MapPin size={20} className="text-muted-foreground mt-0.5" />
        <View className="flex-1">
          <Text className="mb-1 text-sm font-mbold text-foreground">
            Địa chỉ
          </Text>
          <Text className="text-sm text-muted-foreground font-default">
            {provider.location.address}, {provider.location.ward},{" "}
            {provider.location.district}, {provider.location.province}
          </Text>
          <Text className="mt-1 text-sm font-mbold text-primary">
            Cách bạn {provider.location.distanceKm}km
          </Text>
        </View>
      </View>

      <View className="flex-row items-start gap-3 mb-4">
        <Clock size={20} className="text-muted-foreground mt-0.5" />
        <View className="flex-1">
          <Text className="mb-1 text-sm font-mbold text-foreground">
            Giờ hoạt động
          </Text>
          <Text className="text-sm text-muted-foreground font-default">
            Hôm nay: {provider.availability.todayOpeningHours.open} -{" "}
            {provider.availability.todayOpeningHours.close}
          </Text>
          {provider.availability.isOpenNow ? (
            <Text className="mt-1 text-sm text-green-500 font-mbold">
              Đang mở cửa
            </Text>
          ) : (
            <Text className="mt-1 text-sm text-red-500 font-mbold">
              Đã đóng cửa
            </Text>
          )}
        </View>
      </View>

      <View className="flex-row items-start gap-3 mb-2">
        <CreditCard size={20} className="text-muted-foreground mt-0.5" />
        <View className="flex-1">
          <Text className="mb-1 text-sm font-mbold text-foreground">
            Phương thức thanh toán
          </Text>
          <Text className="text-sm text-muted-foreground font-default">
            {[
              provider.paymentMethods.cash && "Tiền mặt",
              provider.paymentMethods.online && "Chuyển khoản / Thẻ",
            ]
              .filter(Boolean)
              .join(", ")}
          </Text>
        </View>
      </View>
    </View>
  );
}
