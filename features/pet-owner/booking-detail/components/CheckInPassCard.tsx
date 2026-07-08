import { Image } from "expo-image";
import { QrCode } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

import type { BookingDetail } from "@/features/pet-owner/booking-detail/types";

const QR_ENDPOINT = "https://api.qrserver.com/v1/create-qr-code/";

type CheckInPassCardProps = {
  booking: BookingDetail;
};

export function CheckInPassCard({ booking }: CheckInPassCardProps) {
  const qrUrl = `${QR_ENDPOINT}?size=240x240&margin=0&data=${encodeURIComponent(
    booking.checkInCode
  )}`;

  return (
    <View className="items-center gap-4 rounded-[24px] border border-primary/10 bg-card p-6 shadow-md">
      <View className="items-center gap-1">
        <View className="mb-1 flex-row items-center gap-2">
          <QrCode size={18} className="text-primary" />
          <Text className="font-mbold text-[16px] leading-6 text-foreground">
            Mã check-in
          </Text>
        </View>
        <Text className="max-w-[260px] text-center font-default text-[13px] leading-5 text-muted-foreground">
          Đưa mã này cho nhân viên spa để xác nhận và bắt đầu dịch vụ
        </Text>
      </View>

      <View className="rounded-2xl border border-border bg-white p-4">
        <Image
          source={{ uri: qrUrl }}
          accessibilityLabel="Mã QR check-in"
          contentFit="contain"
          transition={200}
          style={{ width: 176, height: 176 }}
        />
      </View>

      <View className="rounded-full bg-muted px-4 py-1.5">
        <Text className="font-mbold text-[13px] uppercase tracking-widest text-muted-foreground">
          #{booking.reference}
        </Text>
      </View>
    </View>
  );
}
