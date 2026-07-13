import { getImageUrl } from "@/lib/helper/cloudinary.helper";
import { Image } from "expo-image";
import { CalendarDays, MapPin, Scissors, Stethoscope } from "lucide-react-native";
import React from "react";
import { Pressable, View, Text } from "react-native";

import { BookingActionButton } from "@/features/pet-owner/bookings/components/BookingActionButton";
import { BookingInfoRow } from "@/features/pet-owner/bookings/components/BookingInfoRow";
import { BookingStatusBadge } from "@/features/pet-owner/bookings/components/BookingStatusBadge";
import type { Booking } from "@/features/pet-owner/bookings/types";
import { cn } from "@/lib/utils";

type BookingCardProps = {
  booking: Booking;
  onPress?: () => void;
  onCancel?: () => void;
  onReschedule?: () => void;
  onViewDetails?: () => void;
  onRebook?: () => void;
};

export function BookingCard({
  booking,
  onPress,
  onCancel,
  onReschedule,
  onViewDetails,
  onRebook,
}: BookingCardProps) {
  const isConfirmed = booking.status === "confirmed";
  const isUpcoming = isConfirmed || booking.status === "pending";
  const ServiceIcon = booking.serviceType === "medical" ? Stethoscope : Scissors;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Xem chi tiết lịch hẹn ${booking.serviceName} cho ${booking.petName}`}
      className="rounded-[20px] border border-border bg-card p-4 shadow-sm active:opacity-95">
      <View className="flex-row gap-4">
        <Image
          source={{
            uri: getImageUrl(booking.petImageUrl, { width: 80, height: 80 }),
          }}
          accessibilityLabel={booking.petName}
          contentFit="cover"
          transition={200}
          style={{ width: 80, height: 80, borderRadius: 16 }}
        />

        <View className="flex-1">
          <View className="flex-row items-start justify-between gap-2">
            <Text
              className="flex-1 font-mbold text-[16px] leading-6 text-foreground"
              numberOfLines={1}
            >
              {booking.petName}
            </Text>
            <BookingStatusBadge status={booking.status} />
          </View>
          <Text
            className="mt-0.5 font-default text-[13px] leading-5 text-muted-foreground"
            numberOfLines={1}
          >
            {booking.petBreed}
          </Text>
          <View className="mt-2 flex-row items-center gap-1.5">
            <CalendarDays
              size={16}
              className={isConfirmed ? "text-primary" : "text-muted-foreground"}
            />
            <Text
              className={cn(
                "font-mbold text-[13px] leading-5",
                isConfirmed ? "text-primary" : "text-muted-foreground"
              )}
            >
              {booking.scheduledAtLabel}
            </Text>
          </View>
        </View>
      </View>

      <View className="my-4 h-px bg-border" />

      <View className="gap-3">
        <BookingInfoRow
          icon={ServiceIcon}
          label="Dịch vụ"
          value={booking.serviceName}
        />
        <BookingInfoRow
          icon={MapPin}
          label="Cơ sở"
          value={booking.providerName}
        />
      </View>

      <View className="mt-4 flex-row gap-3">
        {isUpcoming ? (
          <>
            <BookingActionButton
              label="Hủy lịch"
              variant="muted"
              onPress={onCancel}
              className="flex-1"
            />
            <BookingActionButton
              label={isConfirmed ? "Đổi lịch" : "Xem chi tiết"}
              onPress={isConfirmed ? onReschedule : onViewDetails}
              className="flex-[2]"
            />
          </>
        ) : (
          <BookingActionButton
            label="Đặt lại"
            onPress={onRebook}
            className="flex-1"
          />
        )}
      </View>
    </Pressable>
  );
}
