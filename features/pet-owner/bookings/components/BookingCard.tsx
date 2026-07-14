import { getImageUrl } from "@/lib/helper/cloudinary.helper";
import { Image } from "expo-image";
import {
  CalendarDays,
  MapPin,
  Scissors,
  Stethoscope,
} from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { BookingActionButton } from "@/features/pet-owner/bookings/components/BookingActionButton";
import { BookingInfoRow } from "@/features/pet-owner/bookings/components/BookingInfoRow";
import { BookingStatusBadge } from "@/features/pet-owner/bookings/components/BookingStatusBadge";
import type { Booking } from "@/features/pet-owner/bookings/types";
import {
  canModifyBooking,
  isInProgressBooking,
} from "@/features/pet-owner/bookings/utils/booking-mapper";
import { cn } from "@/lib/utils";

type BookingCardProps = {
  booking: Booking;
  onPress?: () => void;
  onCancel?: () => void;
  onReschedule?: () => void;
  onViewDetails?: () => void;
  onRebook?: () => void;
  onPay?: () => void;
  onPaymentExpire?: () => void;
};

function PaymentTimer({
  createdAt,
  onExpire,
}: {
  createdAt: string;
  onExpire?: () => void;
}) {
  const [timeLeft, setTimeLeft] = React.useState(() => {
    const createdTime = new Date(createdAt).getTime();
    const expiryTime = createdTime + 130 * 60 * 1000; // 100 mins
    return Math.max(0, expiryTime - Date.now());
  });

  const hasExpired = React.useRef(false);

  React.useEffect(() => {
    if (timeLeft <= 0 && !hasExpired.current) {
      hasExpired.current = true;
      onExpire?.();
    }
  }, [timeLeft, onExpire]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const createdTime = new Date(createdAt).getTime();
      const expiryTime = createdTime + 100 * 60 * 1000;
      setTimeLeft(Math.max(0, expiryTime - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [createdAt]);

  if (timeLeft <= 0) {
    return (
      <Text className="font-mbold text-[13px] leading-5 text-white">
        Hết hạn
      </Text>
    );
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const formattedTime = `${hours > 0 ? `${hours}h` : ""}${minutes}m${seconds}s`;

  return (
    <View className="flex-row items-center justify-center gap-1">
      <Text className="font-mbold text-[13px] leading-5 text-white">
        Thanh toán
      </Text>
      <Text className="font-default text-[12px] leading-5 text-white/90">
        ({formattedTime})
      </Text>
    </View>
  );
}

export function BookingCard({
  booking,
  onPress,
  onCancel,
  onReschedule,
  onViewDetails,
  onRebook,
  onPay,
  onPaymentExpire,
}: BookingCardProps) {
  const isConfirmed = booking.status === "confirmed";
  const canModify = canModifyBooking(booking.status);
  const isInProgress = isInProgressBooking(booking.status);
  const ServiceIcon =
    booking.serviceType === "medical" ? Stethoscope : Scissors;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Xem chi tiết lịch hẹn ${booking.serviceName} cho ${booking.petName}`}
      className="rounded-[20px] border border-border bg-card p-4 shadow-sm active:opacity-95"
    >
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
                isConfirmed ? "text-primary" : "text-muted-foreground",
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
        {canModify ? (
          <>
            <BookingActionButton
              label="Hủy lịch"
              variant="muted"
              onPress={onCancel}
              className="flex-1"
            />
            {booking.status === "pending" &&
            booking.paymentMethod === "ONLINE" &&
            booking.paymentStatus !== "SUCCESS" &&
            onPay ? (
              <BookingActionButton
                label={
                  booking.createAt ? (
                    <PaymentTimer
                      createdAt={booking.createAt}
                      onExpire={onPaymentExpire}
                    />
                  ) : (
                    "Thanh toán"
                  )
                }
                onPress={onPay}
                className="flex-[2] bg-green-500 border-green-500"
              />
            ) : (
              <BookingActionButton
                label={"Xem chi tiết"}
                onPress={onViewDetails}
                className="flex-[2]"
              />
            )}
          </>
        ) : isInProgress ? (
          <BookingActionButton
            label="Xem chi tiết"
            onPress={onViewDetails}
            className="flex-1"
          />
        ) : null}
      </View>
    </Pressable>
  );
}
