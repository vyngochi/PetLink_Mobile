import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import {
  LogoutButton,
  ProfileInfoCard,
  ProfileTopBar,
  SettingsMenu,
} from "@/features/pet-owner/profile/components";
import { useProfile } from "@/features/pet-owner/profile/hooks/useProfile";
import type { ProfileMenuItem } from "@/features/pet-owner/profile/types";
import { useAuth } from "@/lib/auth";

export function ProfileView() {
  const router = useRouter();
  const { profile } = useProfile();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const handleMenuPress = (item: ProfileMenuItem) => {
    if (item.route) router.push(item.route as never);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-5">
        <ProfileTopBar avatarUrl={profile.avatarUrl} />
      </View>

      <ScrollView
        contentContainerClassName="px-5 pb-12 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-6 font-mbold text-[28px] leading-9 text-foreground">
          Hồ sơ
        </Text>

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
