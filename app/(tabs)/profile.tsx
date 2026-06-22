import { GuestProfileView } from "@/features/guest/guest-profile/views/GuestProfileView";
import { useAuth } from "@/lib/auth";
import { ProfileView } from "@/features/pet-owner/profile/views/ProfileView";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function profile() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
        <GuestProfileView />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-1 px-5 pt-6">
        <Text className="mb-6 text-3xl font-mbold text-foreground">Hồ sơ</Text>
        <Pressable
          onPress={logout}
          className="flex-row items-center justify-center w-full border-2 rounded-full h-14 border-primary active:bg-primary/10"
        >
          <Text className="text-lg text-primary font-mbold">Đăng xuất</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
