import { CalendarDays, Fingerprint, Store } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

import type { ConfirmedBooking } from "@/features/pet-owner/booking-flow/shared/types";

interface ConfirmedBookingCardProps {
  booking: ConfirmedBooking;
}

export function ConfirmedBookingCard({ booking }: ConfirmedBookingCardProps) {
  return (
    <View className="w-full overflow-hidden rounded-[24px] border border-border bg-card shadow-sm">
      <View className="h-1.5 w-full bg-primary" />

      <View className="gap-5 p-5">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="font-default text-[11px] uppercase tracking-wider text-muted-foreground">
              Mã đặt lịch
            </Text>
            <Text className="mt-1 font-mbold text-[17px] text-foreground">
              #{booking.reference}
            </Text>
          </View>
          <Fingerprint size={24} className="text-muted-foreground" />
        </View>

        <View className="h-px w-full bg-border" />

        <View className="flex-row items-center gap-4">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <CalendarDays size={22} className="text-primary" />
          </View>
          <View className="flex-1">
            <Text className="font-default text-[11px] uppercase tracking-wider text-muted-foreground">
              Thời gian
            </Text>
            <Text className="mt-0.5 font-mbold text-[15px] text-foreground">
              {booking.scheduledAtLabel}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-4">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10">
            <Store size={22} className="text-secondary" />
          </View>
          <View className="flex-1">
            <Text className="font-default text-[11px] uppercase tracking-wider text-muted-foreground">
              Nhà cung cấp
            </Text>
            <Text className="mt-0.5 font-mbold text-[15px] text-foreground">
              {booking.providerName}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
