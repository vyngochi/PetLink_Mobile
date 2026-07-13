import { useRouter, type Href } from "expo-router";
import { Bell } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

import { Colors } from "@/constants/theme";
import { hasUnreadNotifications } from "@/features/pet-owner/notifications/constants/notifications-mock";

export default function NotificationBell() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push("/pet-owner/notifications" as Href)}
      accessibilityRole="button"
      accessibilityLabel="Thông báo"
      hitSlop={8}
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.9 : 1 }] })}
      className="h-11 w-11 items-center justify-center rounded-full bg-muted"
    >
      <Bell size={22} color={Colors.light.tint} />
      {hasUnreadNotifications && (
        <View className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-primary" />
      )}
    </Pressable>
  );
}
