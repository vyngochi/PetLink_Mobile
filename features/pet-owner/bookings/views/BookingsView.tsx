import { useRouter, type Href } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { toast } from "@/components/toast";
import { Colors } from "@/constants/theme";
import {
  BookingCard,
  BookingsTabs,
  EmptyBookings,
} from "@/features/pet-owner/bookings/components";
import { useBookings } from "@/features/pet-owner/bookings/hooks/useBookings";
import { useCancelBooking } from "@/features/pet-owner/bookings/hooks/useCancelBooking";
import type { Booking, BookingTab } from "@/features/pet-owner/bookings/types";
import { getApiErrorMessage } from "@/lib/http";

export function BookingsView() {
  const router = useRouter();
  const { upcoming, past, isLoading, isError, error, refetch } = useBookings();
  const cancelBooking = useCancelBooking();
  const [tab, setTab] = useState<BookingTab>("upcoming");

  const bookings = tab === "upcoming" ? upcoming : past;

  const handleCancel = (booking: Booking) => {
    Alert.alert(
      "Hủy lịch hẹn",
      `Bạn có chắc muốn hủy lịch hẹn "${booking.serviceName}" cho ${booking.petName}?`,
      [
        { text: "Giữ lịch", style: "cancel" },
        {
          text: "Hủy lịch",
          style: "destructive",
          onPress: () => {
            cancelBooking.mutate(booking.id, {
              onSuccess: () => {
                toast.success("Đã hủy lịch hẹn", { position: "bottom" });
              },
              onError: (cancelError) => {
                toast.error(
                  getApiErrorMessage(cancelError, {
                    fallback: "Không thể hủy lịch hẹn, vui lòng thử lại",
                    network: "Không có kết nối mạng, vui lòng thử lại",
                  }),
                  { position: "bottom" },
                );
              },
            });
          },
        },
      ],
    );
  };

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
                  onCancel={() => handleCancel(booking)}
                  onReschedule={notifyComingSoon}
                  onViewDetails={() => openDetail(booking)}
                  onRebook={() => handleRebook(booking)}
                />
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
