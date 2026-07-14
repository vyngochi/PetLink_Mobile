import React from "react";
import { Text, View } from "react-native";

import type { BookingStatus } from "@/features/pet-owner/bookings/types";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; container: string; text: string }
> = {
  pending: {
    label: "Chờ xác nhận",
    container: "bg-amber-500/15",
    text: "text-amber-600",
  },
  confirmed: {
    label: "Đã xác nhận",
    container: "bg-primary/10",
    text: "text-primary",
  },
  checked_in: {
    label: "Đã check-in",
    container: "bg-sky-500/15",
    text: "text-sky-600",
  },
  checked_out: {
    label: "Đã check-out",
    container: "bg-violet-500/15",
    text: "text-violet-600",
  },
  completed: {
    label: "Hoàn tất",
    container: "bg-muted",
    text: "text-muted-foreground",
  },
  cancelled: {
    label: "Đã hủy",
    container: "bg-destructive/10",
    text: "text-destructive",
  },
  rejected: {
    label: "Bị từ chối",
    container: "bg-destructive/10",
    text: "text-destructive",
  },
  dispute: {
    label: "Đang tranh chấp",
    container: "bg-orange-500/15",
    text: "text-orange-600",
  },
  no_arrival: {
    label: "Không đến",
    container: "bg-rose-500/15",
    text: "text-rose-600",
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
