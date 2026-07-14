import { CalendarX, History } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

import type { BookingTab } from "@/features/pet-owner/bookings/types";

type EmptyBookingsProps = {
  tab: BookingTab;
  onExplore?: () => void;
};

export function EmptyBookings({ tab, onExplore }: EmptyBookingsProps) {
  const isUpcoming = tab === "confirmed";
  const Icon = isUpcoming ? CalendarX : History;
  const message = isUpcoming
    ? "Bạn chưa có lịch hẹn nào sắp tới. Khám phá dịch vụ và đặt lịch chăm sóc cho thú cưng ngay."
    : "Chưa có lịch hẹn nào trong lịch sử.";

  return (
    <View className="items-center justify-center px-8 py-16">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon size={28} className="text-muted-foreground" />
      </View>
      <Text className="mt-4 text-center font-default text-[14px] leading-[21px] text-muted-foreground">
        {message}
      </Text>
      {isUpcoming && onExplore ? (
        <Pressable
          onPress={onExplore}
          accessibilityRole="button"
          accessibilityLabel="Khám phá dịch vụ"
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
          className="mt-6 items-center justify-center rounded-full bg-primary px-6 py-3"
        >
          <Text className="font-mbold text-[13px] leading-5 text-primary-foreground">
            Khám phá dịch vụ
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
