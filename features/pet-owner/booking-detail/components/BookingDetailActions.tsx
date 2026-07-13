import React from "react";
import { Pressable, Text } from "react-native";

import type { BookingStatus } from "@/features/pet-owner/bookings/types";
import {
  canModifyBooking,
  isInProgressBooking,
} from "@/features/pet-owner/bookings/utils/booking-mapper";

type BookingDetailActionsProps = {
  status: BookingStatus;
  onReschedule?: () => void;
  onCancel?: () => void;
  onRebook?: () => void;
};

export function BookingDetailActions({
  status,
  onReschedule,
  onCancel,
  onRebook,
}: BookingDetailActionsProps) {
  if (isInProgressBooking(status)) {
    return null;
  }

  if (!canModifyBooking(status)) {
    return (
      <Pressable
        onPress={onRebook}
        accessibilityRole="button"
        accessibilityLabel="Đặt lại"
        style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.98 : 1 }] })}
        className="w-full items-center justify-center rounded-full bg-primary py-4 shadow-sm"
      >
        <Text className="font-mbold text-[15px] leading-5 text-white">
          Đặt lại
        </Text>
      </Pressable>
    );
  }

  return (
    <>
      <Pressable
        onPress={onReschedule}
        accessibilityRole="button"
        accessibilityLabel="Đổi lịch"
        style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.98 : 1 }] })}
        className="w-full items-center justify-center rounded-full border-2 border-primary py-4 active:bg-primary/5"
      >
        <Text className="font-mbold text-[15px] leading-5 text-primary">
          Đổi lịch
        </Text>
      </Pressable>
      <Pressable
        onPress={onCancel}
        accessibilityRole="button"
        accessibilityLabel="Hủy lịch"
        className="w-full items-center justify-center rounded-full py-3 active:opacity-60"
      >
        <Text className="font-mbold text-[15px] leading-5 text-destructive">
          Hủy lịch hẹn
        </Text>
      </Pressable>
    </>
  );
}
