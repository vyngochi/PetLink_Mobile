import { useQueryClient } from "@tanstack/react-query";
import { useRouter, type Href } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { toast } from "@/components/toast";
import { Colors } from "@/constants/theme";
import {
  BookingCard,
  BookingsTabs,
  CancelBookingSheet,
  EmptyBookings,
} from "@/features/pet-owner/bookings/components";
import { useBookings } from "@/features/pet-owner/bookings/hooks/useBookings";
import type { Booking, BookingTab } from "@/features/pet-owner/bookings/types";
import { bookingKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { bookingService } from "@/features/pet-owner/shared/services/booking.service";
import { getApiErrorMessage } from "@/lib/http";

export function BookingsView() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { bookings, isLoading, isError, error, refetch } = useBookings();
  const [tab, setTab] = useState<BookingTab>("all");
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [isPaying, setIsPaying] = useState(false);

  const counts = useMemo(() => {
    const c: Record<BookingTab, number> = {
      all: bookings.length,
      pending_payment: 0,
      pending_confirmation: 0,
      confirmed: 0,
      checked_in: 0,
      checked_out: 0,
      completed: 0,
      cancelled: 0,
      rejected: 0,
      dispute: 0,
      no_arrival: 0,
    };
    bookings.forEach((b) => {
      if (b.status === "pending") {
        if (b.paymentMethod === "ONLINE" && b.paymentStatus !== "SUCCESS") {
          c.pending_payment++;
        } else {
          c.pending_confirmation++;
        }
      } else {
        if (c[b.status as keyof typeof c] !== undefined) {
          c[b.status as keyof typeof c]++;
        }
      }
    });
    return c;
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (tab === "all") return bookings;
    return bookings.filter((b) => {
      if (tab === "pending_payment") {
        return b.status === "pending" && b.paymentMethod === "ONLINE" && b.paymentStatus !== "SUCCESS";
      }
      if (tab === "pending_confirmation") {
        return b.status === "pending" && !(b.paymentMethod === "ONLINE" && b.paymentStatus !== "SUCCESS");
      }
      return b.status === tab;
    });
  }, [bookings, tab]);

  const handleRebook = (booking: Booking) => {
    router.push({
      pathname: "/pet-owner/booking/create",
      params: { serviceId: booking.serviceId, petId: booking.petId },
    });
  };

  const openDetail = (booking: Booking) => {
    router.push(`/pet-owner/booking/${booking.id}` as Href);
  };

  const notifyComingSoon = () => {
    toast.info("Tính năng đang được phát triển", { position: "bottom" });
  };

  const handlePayMomo = async (booking: Booking) => {
    if (isPaying) return;
    setIsPaying(true);
    try {
      const res = await bookingService.createMomoPayment(booking.id);
      const payUrl = res.data?.data?.payUrl;
      if (payUrl) {
        await WebBrowser.openBrowserAsync(payUrl);
        // Sau khi đóng browser thì refetch lại để cập nhật trạng thái
        queryClient.invalidateQueries({
          queryKey: bookingKeys.myBookings(),
        });
      } else {
        toast.error("Không thể tạo thanh toán MoMo", { position: "bottom" });
      }
    } catch (error) {
      toast.error("Lỗi khi kết nối MoMo", { position: "bottom" });
    } finally {
      setIsPaying(false);
    }
  };

  const handlePaymentExpire = async (booking: Booking) => {
    try {
      await bookingService.cancelMyBooking(booking.id, "Quá thời gian thanh toán");
      queryClient.invalidateQueries({
        queryKey: bookingKeys.myBookings(),
      });
      toast.success("Lịch hẹn đã tự động hủy do quá hạn thanh toán", { position: "bottom" });
    } catch (error) {
      console.error("Lỗi khi tự động hủy lịch:", error);
    }
  };

  const subtitle =
    filteredBookings.length > 0
      ? `Bạn có ${filteredBookings.length} lịch hẹn trong danh sách`
      : "Quản lý lịch hẹn chăm sóc thú cưng của bạn";

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-5 pt-2">
        <Text className="font-mbold text-[24px] leading-8 text-foreground">
          Đặt lịch của tôi
        </Text>
        <Text className="mt-1 font-default text-[13px] leading-5 text-muted-foreground">
          {subtitle}
        </Text>
      </View>

      <View className="pt-4">
        <BookingsTabs
          value={tab}
          onChange={setTab}
          counts={counts}
        />
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={Colors.light.tint} />
        </View>
      ) : isError ? (
        <View className="flex-1 items-center justify-center gap-4 px-5">
          <Text className="text-center font-mbold text-[16px] text-muted-foreground">
            {getApiErrorMessage(error, {
              fallback: "Không thể tải lịch hẹn, vui lòng thử lại",
              network: "Không có kết nối mạng, vui lòng thử lại",
            })}
          </Text>
          <Pressable
            onPress={() => refetch()}
            className="rounded-full bg-primary px-6 py-3 active:opacity-90"
          >
            <Text className="font-mbold text-primary-foreground">Thử lại</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          contentContainerClassName="px-5 pb-10 pt-5"
          showsVerticalScrollIndicator={false}
        >
          {filteredBookings.length === 0 ? (
            <EmptyBookings
              tab={"upcoming" as any}
              onExplore={() => router.push("/(tabs)/providers")}
            />
          ) : (
            <View className="gap-4">
              {filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onPress={() => openDetail(booking)}
                  onCancel={() => setCancelTarget(booking)}
                  onReschedule={notifyComingSoon}
                  onViewDetails={() => openDetail(booking)}
                  onRebook={() => handleRebook(booking)}
                  onPay={() => handlePayMomo(booking)}
                  onPaymentExpire={() => handlePaymentExpire(booking)}
                />
              ))}
            </View>
          )}
        </ScrollView>
      )}

      {cancelTarget ? (
        <CancelBookingSheet
          key={cancelTarget.id}
          visible
          bookingId={cancelTarget.id}
          serviceName={cancelTarget.serviceName}
          petName={cancelTarget.petName}
          onClose={() => setCancelTarget(null)}
          onSuccess={() => {
            setCancelTarget(null);
            toast.success("Đã hủy lịch hẹn", { position: "bottom" });
          }}
        />
      ) : null}
    </SafeAreaView>
  );
}
