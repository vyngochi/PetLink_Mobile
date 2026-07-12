import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import { useRouter } from "expo-router";
import { MapPin } from "lucide-react-native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useSetLocationName } from "../hooks/useSetLocationName";
import NotificationBell from "./NotificationBell";

export default function HomeLeftHeader() {
  const router = useRouter();
  const { isAuthenticated: isLogged, user } = useAuthStore();
  const [locationName, setLocationName] =
    useState<string>("Đang tìm vị trí...");

  useSetLocationName(setLocationName);

  return (
    <View>
      {!isLogged ? (
        <Button onPress={() => router.push({ pathname: "/(auth)/login" })}>
          <Text className="text-white font-mbold">Bắt đầu</Text>
        </Button>
      ) : (
        <View className="flex-row items-center gap-3">
          <View className="flex-col justify-center">
            <Text className="text-sm text-foreground font-mbold">
              Xin chào, {user?.fullName || user?.userName || "Bạn"}
            </Text>
            <View className="flex-row items-center gap-1 mt-1">
              <MapPin size={12} className="mr-1 text-primary" />
              <Text
                className="text-xs text-muted-foreground font-default max-w-32"
                numberOfLines={1}
              >
                {locationName}
              </Text>
            </View>
          </View>
          <NotificationBell />
        </View>
      )}
    </View>
  );
}
