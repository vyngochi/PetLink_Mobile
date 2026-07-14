import { useRouter, type Href } from "expo-router";
import React, { useState } from "react";
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
import { getApiErrorMessage } from "@/lib/http";

export function BookingsView() {
  const router = useRouter();
  const { upcoming, past, isLoading, isError, error, refetch } = useBookings();
  const [tab, setTab] = useState<BookingTab>("upcoming");
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);

  const bookings = tab === "upcoming" ? upcoming : past;

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

  const subtitle =
    upcoming.length > 0
      ? `Bạn có ${upcoming.length} lịch hẹn sắp tới`
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

      <View className="px-5 pt-4">
        <BookingsTabs
          value={tab}
          onChange={setTab}
          upcomingCount={upcoming.length}
          pastCount={past.length}
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
          {bookings.length === 0 ? (
            <EmptyBookings
              tab={tab}
              onExplore={() => router.push("/(tabs)/providers")}
            />
          ) : (
            <View className="gap-4">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onPress={() => openDetail(booking)}
                  onCancel={() => setCancelTarget(booking)}
                  onReschedule={notifyComingSoon}
                  onViewDetails={() => openDetail(booking)}
                  onRebook={() => handleRebook(booking)}
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
