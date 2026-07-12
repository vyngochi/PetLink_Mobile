import { Image } from "expo-image";
import {
  CalendarDays,
  ClipboardCheck,
  Store,
  Stethoscope,
} from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

import type {
  BookingPetOption,
  BookingServiceOption,
} from "@/features/pet-owner/booking-flow/shared/types";
import { formatCurrency } from "@/features/pet-owner/booking-flow/shared/utils/currency";

interface BookingSummaryCardProps {
  pet: BookingPetOption;
  service: BookingServiceOption;
  providerName: string;
  scheduleLabel: string;
}

export function BookingSummaryCard({
  pet,
  service,
  providerName,
  scheduleLabel,
}: BookingSummaryCardProps) {
  const rows = [
    { icon: Stethoscope, label: "Dịch vụ", value: service.name },
    { icon: Store, label: "Nhà cung cấp", value: providerName },
    { icon: CalendarDays, label: "Thời gian", value: scheduleLabel },
  ];

  return (
    <View className="rounded-[20px] border border-border bg-card p-4 shadow-sm">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="font-mbold text-[16px] text-foreground">
          Tóm tắt lịch hẹn
        </Text>
        <ClipboardCheck size={20} className="text-primary" />
      </View>

      <View className="flex-row items-center gap-3.5">
        <Image
          source={{ uri: pet.imageUrl }}
          accessibilityLabel={pet.name}
          contentFit="cover"
          transition={200}
          style={{ width: 48, height: 48, borderRadius: 24 }}
        />
        <View>
          <Text className="font-mbold text-[15px] text-foreground">
            {pet.name}
          </Text>
          <Text className="mt-0.5 font-default text-[13px] text-muted-foreground">
            {pet.breed}
          </Text>
        </View>
      </View>

      <View className="my-4 h-px bg-border" />

      <View className="gap-3.5">
        {rows.map((row) => (
          <View key={row.label} className="flex-row items-start gap-3">
            <row.icon size={18} className="mt-0.5 text-muted-foreground" />
            <View className="flex-1">
              <Text className="font-default text-[11px] uppercase tracking-wider text-muted-foreground">
                {row.label}
              </Text>
              <Text className="mt-0.5 font-default text-[14px] text-foreground">
                {row.value}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View className="mt-4 flex-row items-center justify-between rounded-xl bg-primary/10 p-4">
        <Text className="font-mbold text-[13px] text-foreground">
          Tạm tính
        </Text>
        <Text className="font-mbold text-[16px] text-primary">
          {formatCurrency(service.price)}
        </Text>
      </View>
    </View>
  );
}
