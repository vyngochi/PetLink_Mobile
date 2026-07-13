import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import type { BookingDetail } from "@/features/pet-owner/booking-detail/types";

type BookingDetailPetCardProps = {
  booking: BookingDetail;
};

export function BookingDetailPetCard({ booking }: BookingDetailPetCardProps) {
  return (
    <View className="flex-row items-center gap-4 rounded-[20px] border border-border bg-card p-4 shadow-sm">
      <Image
        source={{ uri: booking.petImageUrl }}
        accessibilityLabel={booking.petName}
        contentFit="cover"
        transition={200}
        style={{ width: 72, height: 72, borderRadius: 999 }}
      />

      <View className="flex-1">
        <Text
          className="font-mbold text-[18px] leading-6 text-foreground"
          numberOfLines={1}
        >
          {booking.petName}
        </Text>
        <Text
          className="mt-0.5 font-default text-[13px] leading-5 text-muted-foreground"
          numberOfLines={1}
        >
          {booking.petBreed}
        </Text>
      </View>
    </View>
  );
}
