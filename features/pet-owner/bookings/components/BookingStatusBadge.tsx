import React from "react";
import { Text, View } from "react-native";

import type { BookingStatus } from "@/features/pet-owner/bookings/types";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; container: string; text: string }
> = {
  confirmed: {
    label: "Đã xác nhận",
    container: "bg-primary/10",
    text: "text-primary",
  },
  pending: {
    label: "Chờ xác nhận",
    container: "bg-amber-500/15",
    text: "text-amber-600",
  },
  completed: {
    label: "Hoàn thành",
    container: "bg-muted",
    text: "text-muted-foreground",
  },
  cancelled: {
    label: "Đã hủy",
    container: "bg-destructive/10",
    text: "text-destructive",
  },
};

type BookingStatusBadgeProps = {
  status: BookingStatus;
};

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <View className={cn("rounded-full px-3 py-1", config.container)}>
      <Text
        className={cn(
          "font-mbold text-[10px] uppercase leading-4 tracking-wider",
          config.text
        )}
      >
        {config.label}
      </Text>
    </View>
  );
}
