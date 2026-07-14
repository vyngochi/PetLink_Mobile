import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { toast } from "@/components/toast";
import {
  LogoutButton,
  ProfileInfoCard,
  SettingsMenu,
} from "@/features/pet-owner/profile/components";
import { useProfile } from "@/features/pet-owner/profile/hooks/useProfile";
import type { ProfileMenuItem } from "@/features/pet-owner/profile/types";
import { authService } from "@/features/authentication/shared/services/auth.service";
import { useAuth } from "@/lib/auth";

export function ProfileView() {
  const router = useRouter();
  const { profile } = useProfile();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await authService.removeDeviceToken();
    } catch (e) {
      console.log("Failed to remove device token", e);
    }

    await logout();
    toast.success("Đăng xuất thành công", {
      position: "bottom",
      duration: 600,
    });
    router.replace("/(tabs)");
  };

  const handleMenuPress = (item: ProfileMenuItem) => {
    if (item.route) router.push(item.route as never);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        contentContainerClassName="px-5 pb-12 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <ProfileInfoCard
          profile={profile}
          onEditPress={() => router.push("/pet-owner/edit-profile")}
        />

        <View className="mt-8">
          <SettingsMenu onItemPress={handleMenuPress} />
        </View>

        <View className="mt-8">
          <LogoutButton onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
