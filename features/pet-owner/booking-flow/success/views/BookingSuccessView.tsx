import { Redirect, useRouter } from "expo-router";
import { Check, PawPrint, X } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { useBookingFlowStore } from "@/features/pet-owner/booking-flow/shared/stores/booking-flow.store";
import { ConfirmedBookingCard } from "@/features/pet-owner/booking-flow/success/components";

export function BookingSuccessView() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { confirmedBooking, reset } = useBookingFlowStore();
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  if (!confirmedBooking) {
    return <Redirect href="/(tabs)" />;
  }

  const handleViewBookings = () => {
    reset();
    router.replace("/(tabs)/booking");
  };

  const handleGoHome = () => {
    reset();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <View className="flex-row items-center px-5 py-2">
        <Pressable
          onPress={handleGoHome}
          className="h-10 w-10 items-center justify-center rounded-full active:opacity-80"
        >
          <X size={26} className="text-muted-foreground" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="items-center px-5 pb-10 pt-6"
      >
        <View className="mb-5 h-28 w-28 items-center justify-center">
          <View className="absolute h-28 w-28 rounded-full bg-primary/10" />
          <Animated.View
            style={{ transform: [{ scale }] }}
            className="h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg"
          >
            <Check size={44} color="#ffffff" strokeWidth={3} />
          </Animated.View>
        </View>

        <Text className="text-center font-mbold text-[26px] leading-9 text-foreground">
          Đặt lịch thành công!
        </Text>
        <Text className="mt-2 px-4 text-center font-default text-[15px] leading-6 text-muted-foreground">
          Lịch hẹn cho{" "}
          <Text className="font-mbold text-primary">
            {confirmedBooking.petName}
          </Text>{" "}
          đã được xác nhận. Chúng tôi sẽ gửi thông báo nhắc lịch cho bạn.
        </Text>

        <View className="mt-8 w-full">
          <ConfirmedBookingCard booking={confirmedBooking} />
        </View>

        <View className="mt-8 flex-row items-center gap-4 opacity-40">
          <PawPrint size={18} className="text-primary" />
          <PawPrint size={18} className="text-secondary" />
          <PawPrint size={18} className="text-primary" />
        </View>
      </ScrollView>

      <View
        className="gap-3 border-t border-border/50 bg-card px-5 pt-4"
        style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 24 }}
      >
        <Pressable
          onPress={handleViewBookings}
          className="w-full items-center rounded-full bg-primary py-4 shadow-sm active:opacity-90"
        >
          <Text className="font-mbold text-[15px] text-white">
            Xem lịch hẹn
          </Text>
        </Pressable>
        <Pressable
          onPress={handleGoHome}
          className="w-full items-center rounded-full border-2 border-border py-3.5 active:bg-muted/40"
        >
          <Text className="font-mbold text-[15px] text-muted-foreground">
            Về trang chủ
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
