import { useRouter } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import {
  CalendarDays,
  Clock,
  MapPin,
  Navigation,
  Scissors,
  Stethoscope,
} from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

import type { BookingDetail } from "@/features/pet-owner/booking-detail/types";

type BookingAppointmentCardProps = {
  booking: BookingDetail;
};

type DetailRowProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

function DetailRow({ icon: Icon, label, value }: DetailRowProps) {
  return (
    <View className="flex-row items-center gap-3">
      <View className="h-10 w-10 items-center justify-center rounded-full bg-muted">
        <Icon size={18} className="text-primary" />
      </View>
      <View className="flex-1">
        <Text className="font-mbold text-[10px] uppercase leading-4 tracking-wider text-muted-foreground">
          {label}
        </Text>
        <Text
          className="mt-0.5 font-default text-[14px] leading-5 text-foreground"
          numberOfLines={3}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

export function BookingAppointmentCard({
  booking,
}: BookingAppointmentCardProps) {
  const router = useRouter();
  const ServiceIcon =
    booking.serviceType === "medical" ? Stethoscope : Scissors;

  return (
    <View className="gap-5 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <View className="flex-row items-start gap-4">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <ServiceIcon size={22} className="text-primary" />
        </View>
        <View className="flex-1">
          <Text className="font-mbold text-[10px] uppercase leading-4 tracking-wider text-muted-foreground">
            Dịch vụ
          </Text>
          <Text className="mt-0.5 font-mbold text-[17px] leading-6 text-foreground">
            {booking.serviceName}
          </Text>
          <Text className="mt-1 font-mbold text-[16px] leading-6 text-primary">
            {booking.price}
          </Text>
        </View>
      </View>

      <View className="h-px w-full bg-border" />

      <View className="gap-4">
        <DetailRow icon={CalendarDays} label="Ngày" value={booking.dateLabel} />
        <DetailRow icon={Clock} label="Giờ" value={booking.timeLabel} />
        <DetailRow
          icon={MapPin}
          label={booking.providerName}
          value={booking.providerAddress}
        />

        <Pressable
          onPress={() =>
            router.push(`/pet-owner/provider/${booking.providerId}/directions`)
          }
          accessibilityRole="button"
          accessibilityLabel="Chỉ đường tới cơ sở"
          className="flex-row items-center justify-center gap-2 py-3 border rounded-full border-primary/40 bg-primary/5 active:opacity-80"
        >
          <Navigation size={16} className="text-primary" />
          <Text className="font-mbold text-[14px] text-primary">Chỉ đường</Text>
        </Pressable>
      </View>
    </View>
  );
}
