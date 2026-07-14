import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowRight, CalendarPlus } from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { toast } from "@/components/toast";
import {
  BookingSummaryCard,
  NotificationHeader,
} from "@/features/pet-owner/notifications/components";
import { useNotificationDetail } from "@/features/pet-owner/notifications/hooks/useNotifications";
import { NOTIFICATION_VISUALS } from "@/features/pet-owner/notifications/utils/notification-visuals";

export function NotificationDetailView() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const notification = useNotificationDetail(id);

  if (!notification) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
        <View className="px-5">
          <NotificationHeader
            title="Chi tiết thông báo"
            onBack={() => router.back()}
          />
        </View>
        <View className="flex-1 items-center justify-center px-5">
          <Text className="font-default text-[14px] text-muted-foreground">
            Không tìm thấy thông báo.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const { Icon, color } = NOTIFICATION_VISUALS[notification.type];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-5">
        <NotificationHeader
          title="Chi tiết thông báo"
          onBack={() => router.back()}
        />
      </View>

      <ScrollView
        contentContainerClassName="px-5 pb-12 pt-4 gap-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-3">
          {!!notification.category && (
            <View className="flex-row items-center gap-2">
              <Icon size={18} color={color} />
              <Text
                className="font-mbold text-[12px] uppercase leading-4 tracking-wider"
                style={{ color }}
              >
                {notification.category}
              </Text>
            </View>
          )}
          <Text className="font-mbold text-[28px] leading-9 text-foreground">
            {notification.title}
          </Text>
        </View>

        <View className="rounded-[20px] bg-secondary/10 p-5">
          <Text className="font-default text-[15px] leading-6 text-foreground">
            {notification.detailMessage ?? notification.message}
          </Text>
        </View>

        {!!notification.booking && (
          <BookingSummaryCard
            booking={notification.booking}
            onDirections={() =>
              toast.success("Đang mở chỉ đường", {
                position: "bottom",
                duration: 800,
              })
            }
          />
        )}

        {!!notification.booking && (
          <View className="gap-4">
            <Pressable
              onPress={() => router.push("/(tabs)/booking")}
              accessibilityRole="button"
              accessibilityLabel="Xem chi tiết đặt lịch"
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
              className="h-14 flex-row items-center justify-center gap-2 rounded-full bg-primary shadow-sm"
            >
              <Text className="font-mbold text-[16px] leading-6 text-primary-foreground">
                Xem chi tiết đặt lịch
              </Text>
              <ArrowRight size={20} color="#ffffff" />
            </Pressable>

            <Pressable
              onPress={() =>
                toast.success("Đã thêm vào lịch", {
                  position: "bottom",
                  duration: 800,
                })
              }
              accessibilityRole="button"
              accessibilityLabel="Thêm vào lịch"
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
              className="h-14 flex-row items-center justify-center gap-2 rounded-full border-2 border-primary/20"
            >
              <CalendarPlus size={20} color="#006E1C" />
              <Text className="font-mbold text-[15px] leading-5 text-primary">
                Thêm vào lịch
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
