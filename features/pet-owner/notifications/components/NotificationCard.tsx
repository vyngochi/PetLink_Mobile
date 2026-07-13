import { getImageUrl } from "@/lib/helper/cloudinary.helper";
import { Image } from "expo-image";
import React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

import type { AppNotification } from "@/features/pet-owner/notifications/types";
import { NOTIFICATION_VISUALS } from "@/features/pet-owner/notifications/utils/notification-visuals";

type NotificationCardProps = {
  notification: AppNotification;
  onPress?: () => void;
};

export function NotificationCard({
  notification,
  onPress,
}: NotificationCardProps) {
  const { Icon, color } = NOTIFICATION_VISUALS[notification.type];
  const showImage = notification.type === "promo" && !!notification.imageUrl;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={notification.title}
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.98 : 1 }],
        opacity: notification.read ? 0.9 : 1,
      })}
      className="rounded-[20px] border border-border bg-card p-4 shadow-sm"
    >
      <View className="flex-row gap-4">
        <View
          className="h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${color}1A` }}
        >
          <Icon size={26} color={color} />
        </View>

        <View className="flex-1">
          <View className="flex-row items-start justify-between gap-2">
            <Text
              className="flex-1 font-mbold text-[16px] leading-5 text-foreground"
              numberOfLines={1}
            >
              {notification.title}
            </Text>
            {!notification.read && (
              <View className="mt-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
            )}
          </View>

          <Text className="mt-1 font-default text-[13px] leading-5 text-muted-foreground">
            {notification.message}
          </Text>

          <Text className="mt-1.5 font-default text-[12px] leading-4 text-muted-foreground/80">
            {notification.time}
          </Text>
        </View>
      </View>

      {showImage && (
        <Image
          source={{
            uri: getImageUrl(notification.imageUrl, {
              width: Dimensions.get("window").width,
              height: 128,
            }),
          }}
          accessibilityLabel={notification.title}
          contentFit="cover"
          transition={200}
          style={{ width: "100%", height: 128, borderRadius: 16, marginTop: 12 }}
        />
      )}
    </Pressable>
  );
}
