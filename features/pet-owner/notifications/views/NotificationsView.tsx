import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import {
  NotificationCard,
  NotificationHeader,
} from "@/features/pet-owner/notifications/components";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
} from "@/features/pet-owner/notifications/hooks/useNotificationMutations";
import { useNotifications } from "@/features/pet-owner/notifications/hooks/useNotifications";
import { BellOff, CheckCheck } from "lucide-react-native";

export function NotificationsView() {
  const router = useRouter();
  const { sections, unreadCount } = useNotifications();
  const { mutate: markAllRead } = useMarkAllNotificationsRead();
  const { mutate: markRead } = useMarkNotificationRead();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-5">
        <NotificationHeader
          title="Thông báo"
          onBack={() => router.back()}
          right={
            unreadCount > 0 ? (
              <Pressable
                onPress={() => markAllRead()}
                accessibilityRole="button"
                className="flex-row items-center justify-center p-2"
              >
                <CheckCheck size={20} color={Colors.light.tint} />
              </Pressable>
            ) : null
          }
        />
      </View>

      <ScrollView
        contentContainerClassName="px-5 pb-12 pt-2"
        showsVerticalScrollIndicator={false}
      >
        {sections.length === 0 ? (
          <View className="flex-1 items-center justify-center pt-32 gap-4">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-muted/30">
              <BellOff size={32} color={Colors.light.tint} opacity={0.5} />
            </View>
            <Text className="font-mmedium text-base text-muted-foreground">
              Bạn không có thông báo nào
            </Text>
          </View>
        ) : (
          <View className="gap-6">
            {sections.map((section) => (
              <View key={section.title} className="gap-4">
                <Text className="font-mbold text-[13px] uppercase leading-4 tracking-wider text-muted-foreground">
                  {section.title}
                </Text>

                <View className="gap-4">
                  {section.items.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onPress={() => {
                        if (!notification.read) {
                          markRead(notification.id);
                        }
                        router.push({
                          pathname: "/pet-owner/notifications/[id]",
                          params: { id: notification.id },
                        });
                      }}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
