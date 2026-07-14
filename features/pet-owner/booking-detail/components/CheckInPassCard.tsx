import { QrCode } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { Colors } from "@/constants/theme";
import type { BookingQrAction } from "@/features/pet-owner/shared/types/booking.type";

const QR_SIZE = 176;

const ACTION_CONFIG: Record<
  BookingQrAction,
  { title: string; description: string }
> = {
  CHECK_IN: {
    title: "Mã check-in",
    description:
      "Đưa mã này cho nhân viên spa để xác nhận và bắt đầu dịch vụ",
  },
  CHECK_OUT: {
    title: "Mã check-out",
    description:
      "Đưa mã này cho nhân viên spa để xác nhận hoàn tất dịch vụ",
  },
};

type CheckInPassCardProps = {
  action: BookingQrAction;
  qrToken: string | null;
  isLoading: boolean;
  reference: string;
};

export function CheckInPassCard({
  action,
  qrToken,
  isLoading,
  reference,
}: CheckInPassCardProps) {
  const config = ACTION_CONFIG[action];

  return (
    <View className="items-center gap-4 rounded-[24px] border border-primary/10 bg-card p-6 shadow-md">
      <View className="items-center gap-1">
        <View className="mb-1 flex-row items-center gap-2">
          <QrCode size={18} className="text-primary" />
          <Text className="font-mbold text-[16px] leading-6 text-foreground">
            {config.title}
          </Text>
        </View>
        <Text className="max-w-[260px] text-center font-default text-[13px] leading-5 text-muted-foreground">
          {config.description}
        </Text>
      </View>

      <View
        className="items-center justify-center rounded-2xl border border-border bg-white p-4"
        style={{ minHeight: QR_SIZE + 32, minWidth: QR_SIZE + 32 }}
      >
        {isLoading || !qrToken ? (
          <ActivityIndicator size="large" color={Colors.light.tint} />
        ) : (
          <QRCode value={qrToken} size={QR_SIZE} />
        )}
      </View>

      <View className="rounded-full bg-muted px-4 py-1.5">
        <Text className="font-mbold text-[13px] uppercase tracking-widest text-muted-foreground">
          #{reference}
        </Text>
      </View>
    </View>
  );
}
