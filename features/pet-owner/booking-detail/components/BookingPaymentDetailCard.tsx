import { Banknote, FileText, Activity, CalendarDays, Wallet, XCircle, AlertCircle } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

import type { BookingDetail } from "@/features/pet-owner/booking-detail/types";
import { formatAppointmentLabel } from "@/features/pet-owner/shared/utils/booking-format";

type BookingPaymentDetailCardProps = {
  booking: BookingDetail;
};

type DetailRowProps = {
  icon: any;
  label: string;
  value: string;
  valueColor?: string;
};

function DetailRow({ icon: Icon, label, value, valueColor }: DetailRowProps) {
  return (
    <View className="flex-row items-start justify-between">
      <View className="flex-row items-center gap-2">
        <Icon size={16} className="text-muted-foreground" />
        <Text className="font-default text-[14px] leading-5 text-muted-foreground">
          {label}
        </Text>
      </View>
      <Text
        className={`font-mbold text-[14px] leading-5 flex-1 text-right ml-4 ${valueColor || "text-foreground"}`}
      >
        {value}
      </Text>
    </View>
  );
}

export function BookingPaymentDetailCard({ booking }: BookingPaymentDetailCardProps) {
  const paymentMethodLabel = booking.paymentMethod === "ONLINE" ? "Chuyển khoản / MoMo" : "Tiền mặt";
  
  let paymentStatusLabel = "Chưa thanh toán";
  let paymentStatusColor = "text-muted-foreground";

  if (booking.paymentStatus === "SUCCESS" || booking.paymentStatus === "PAID") {
    paymentStatusLabel = "Đã thanh toán";
    paymentStatusColor = "text-green-600";
  } else if (booking.paymentStatus === "FAILED" || booking.paymentStatus === "CANCELLED") {
    paymentStatusLabel = "Thất bại / Đã hủy";
    paymentStatusColor = "text-destructive";
  } else if (booking.paymentStatus === "PENDING") {
    paymentStatusLabel = "Đang chờ thanh toán";
    paymentStatusColor = "text-orange-500";
  }

  const createdAtLabel = booking.createAt ? formatAppointmentLabel(booking.createAt) : "N/A";

  return (
    <View className="gap-4 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <Text className="font-mbold text-[15px] uppercase tracking-wider text-foreground">
        Thông tin chi tiết
      </Text>
      
      <View className="gap-3">
        <DetailRow icon={CalendarDays} label="Ngày tạo đơn" value={createdAtLabel} />
        <DetailRow icon={Wallet} label="Tổng thanh toán" value={booking.price} />
        <DetailRow icon={Banknote} label="Phương thức" value={paymentMethodLabel} />
        <DetailRow 
          icon={Activity} 
          label="Trạng thái thanh toán" 
          value={paymentStatusLabel} 
          valueColor={paymentStatusColor}
        />
        {booking.note ? (
          <DetailRow icon={FileText} label="Ghi chú" value={booking.note} />
        ) : null}
        {booking.cancelReason ? (
          <DetailRow icon={XCircle} label="Lý do hủy" value={booking.cancelReason} valueColor="text-destructive" />
        ) : null}
        {booking.refundReason ? (
          <DetailRow icon={AlertCircle} label="Lý do hoàn tiền" value={booking.refundReason} valueColor="text-orange-500" />
        ) : null}
      </View>
    </View>
  );
}
