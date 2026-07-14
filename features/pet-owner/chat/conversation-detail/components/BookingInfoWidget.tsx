import { Colors } from "@/constants/theme";
import { ConversationBooking } from "@/features/pet-owner/chat/shared/types";
import { Href, useRouter } from "expo-router";
import { Calendar, Clock, Info } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

type BookingInfoWidgetProps = {
  booking: ConversationBooking;
};

export function BookingInfoWidget({ booking }: BookingInfoWidgetProps) {
  const isCancelled = booking.status === "CANCELLED";
  const router = useRouter();

  const dateObj = new Date(booking.appointmentStart);
  const formattedDate = dateObj.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = dateObj.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const onPress = () => {
    router.push(`/pet-owner/booking/${booking.id}` as Href);
  };

  return (
    <Pressable
      onPress={onPress}
      className="mb-2 rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-2">
          <Text className="font-mbold text-[15px] text-foreground mb-1">
            {booking.service?.name || "Dịch vụ đã đặt"}
          </Text>
          <View className="flex-row items-center mt-2">
            <Calendar size={14} color={Colors.light.icon} />
            <Text className="font-default text-[13px] text-muted-foreground ml-1.5 mr-4">
              {formattedDate}
            </Text>
            <Clock size={14} color={Colors.light.icon} />
            <Text className="font-default text-[13px] text-muted-foreground ml-1.5">
              {formattedTime}
            </Text>
          </View>
        </View>

        <View
          className={`rounded-full px-3 py-1 ${isCancelled ? "bg-destructive/10" : `${STATUS_CONFIG[booking.status].container}`}`}
        >
          <Text
            className={`font-mbold text-[12px] ${isCancelled ? "text-destructive" : `${STATUS_CONFIG[booking.status].text}`}`}
          >
            {isCancelled ? "Đã hủy" : STATUS_CONFIG[booking.status].label}
          </Text>
        </View>
      </View>

      {isCancelled && (
        <View className="mt-3 flex-row items-center rounded-lg bg-destructive/10 p-2.5">
          <Info size={16} color={"red"} />
          <Text className="ml-2 flex-1 font-default text-[12px] text-destructive">
            Lịch hẹn này đã bị hủy. Bạn không thể gửi thêm tin nhắn.
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const STATUS_CONFIG: Record<
  string,
  { label: string; container: string; text: string }
> = {
  PENDING: {
    label: "Chờ xác nhận",
    container: "bg-amber-500/15",
    text: "text-amber-600",
  },
  CONFIRMED: {
    label: "Đã xác nhận",
    container: "bg-primary/10",
    text: "text-primary",
  },
  CHECKED_IN: {
    label: "Đã check-in",
    container: "bg-sky-500/15",
    text: "text-sky-600",
  },
  CHECKED_OUT: {
    label: "Đã check-out",
    container: "bg-violet-500/15",
    text: "text-violet-600",
  },
  COMPLETED: {
    label: "Hoàn tất",
    container: "bg-muted",
    text: "text-muted-foreground",
  },
  CANCELLED: {
    label: "Đã hủy",
    container: "bg-destructive/10",
    text: "text-destructive",
  },
  REJECTED: {
    label: "Bị từ chối",
    container: "bg-destructive/10",
    text: "text-destructive",
  },
  DISPUTE: {
    label: "Đang tranh chấp",
    container: "bg-orange-500/15",
    text: "text-orange-600",
  },
  NO_ARRIVAL: {
    label: "Không đến",
    container: "bg-rose-500/15",
    text: "text-rose-600",
  },
};
