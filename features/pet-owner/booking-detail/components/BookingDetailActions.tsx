import React from "react";
import { Pressable, Text } from "react-native";

import type { BookingStatus } from "@/features/pet-owner/bookings/types";
import {
  canModifyBooking,
  isInProgressBooking,
} from "@/features/pet-owner/bookings/utils/booking-mapper";

type BookingDetailActionsProps = {
  status: BookingStatus;
  canReview?: boolean;
  onReview?: () => void;
  onReschedule?: () => void;
  onCancel?: () => void;
  onRebook?: () => void;
};

export function BookingDetailActions({
  status,
  canReview = false,
  onReview,
  onCancel,
}: BookingDetailActionsProps) {
  if (isInProgressBooking(status)) {
    return null;
  }

  if (!canModifyBooking(status)) {
    return (
      <>
        {canReview ? (
          <Pressable
            onPress={onReview}
            accessibilityRole="button"
            accessibilityLabel="Đánh giá dịch vụ"
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
            className="w-full items-center justify-center rounded-full bg-primary py-4 shadow-sm"
          >
            <Text className="font-mbold text-[15px] leading-5 text-white">
              Đánh giá dịch vụ
            </Text>
          </Pressable>
        ) : null}
      </>
    );
  }

  return (
    <>
      <Pressable
        onPress={onCancel}
        accessibilityRole="button"
        accessibilityLabel="Hủy lịch"
        className="w-full items-center justify-center rounded-full py-3 active:opacity-60 border border-red-500"
      >
        <Text className="font-mbold text-[15px] leading-5 text-destructive">
          Hủy lịch hẹn
        </Text>
      </Pressable>
    </>
  );
}
