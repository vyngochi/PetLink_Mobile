import {
  CalendarClock,
  MapPin,
  Navigation,
  PawPrint,
  RefreshCw,
  Stethoscope,
} from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

import type { NotificationBookingSummary } from "@/features/pet-owner/notifications/types";

type BookingSummaryCardProps = {
  booking: NotificationBookingSummary;
  onDirections?: () => void;
};

export function BookingSummaryCard({
  booking,
  onDirections,
}: BookingSummaryCardProps) {
  return (
    <View className="gap-4">
      <Text className="px-1 font-mbold text-[18px] leading-6 text-foreground">
        Tóm tắt lịch hẹn
      </Text>

      <View className="flex-row gap-4">
        <View className="flex-1 gap-2 rounded-[20px] border border-border bg-card p-5 shadow-sm">
          <PawPrint size={22} color="#006E1C" />
          <Text className="font-default text-[12px] leading-4 text-muted-foreground">
            Tên thú cưng
          </Text>
          <Text className="font-mbold text-[16px] leading-6 text-foreground">
            {booking.petName}
          </Text>
        </View>

        <View className="flex-1 gap-2 rounded-[20px] border border-border bg-card p-5 shadow-sm">
          <Stethoscope size={22} color="#8f4e00" />
          <Text className="font-default text-[12px] leading-4 text-muted-foreground">
            Dịch vụ
          </Text>
          <Text className="font-mbold text-[16px] leading-6 text-foreground">
            {booking.service}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between rounded-[20px] border border-border bg-card p-5 shadow-sm">
        <View className="flex-1 gap-1">
          <Text className="font-default text-[12px] leading-4 text-muted-foreground">
            Thời gian
          </Text>
          <View className="flex-row items-center gap-2">
            <CalendarClock size={20} color="#006492" />
            <Text className="font-mbold text-[16px] leading-6 text-foreground">
              {booking.scheduledFor}
            </Text>
          </View>
        </View>
        <View className="h-10 w-10 items-center justify-center rounded-full bg-secondary/15">
          <RefreshCw size={18} color="#006492" />
        </View>
      </View>

      <View className="gap-3 rounded-[20px] border border-border bg-card p-5 shadow-sm">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 gap-1">
            <Text className="font-default text-[12px] leading-4 text-muted-foreground">
              Địa điểm phòng khám
            </Text>
            <Text className="font-mbold text-[16px] leading-6 text-foreground">
              {booking.clinicName}
            </Text>
          </View>
          <Pressable
            onPress={onDirections}
            accessibilityRole="button"
            accessibilityLabel="Chỉ đường"
            hitSlop={8}
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
            className="h-10 w-10 items-center justify-center rounded-full bg-primary/10"
          >
            <Navigation size={18} color="#006E1C" />
          </Pressable>
        </View>
        <View className="flex-row items-center gap-2">
          <MapPin size={16} className="text-muted-foreground" />
          <Text className="flex-1 font-default text-[13px] leading-5 text-muted-foreground">
            {booking.clinicAddress}
          </Text>
        </View>
      </View>
    </View>
  );
}
