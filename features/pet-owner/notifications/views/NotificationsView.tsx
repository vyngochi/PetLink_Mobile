import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  NotificationCard,
  NotificationHeader,
} from "@/features/pet-owner/notifications/components";
import { useNotifications } from "@/features/pet-owner/notifications/hooks/useNotifications";

export function NotificationsView() {
  const router = useRouter();
  const { sections } = useNotifications();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-5">
        <NotificationHeader title="Thông báo" onBack={() => router.back()} />
      </View>

      <ScrollView
        contentContainerClassName="px-5 pb-12 pt-2"
        showsVerticalScrollIndicator={false}
      >
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
                    onPress={() =>
                      router.push({
                        pathname: "/pet-owner/notifications/[id]",
                        params: { id: notification.id },
                      })
                    }
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
