import { GuestProfileView } from "@/features/guest/guest-profile/views/GuestProfileView";
import { useAuth } from "@/lib/auth";
import { ProfileView } from "@/features/pet-owner/profile/views/ProfileView";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
        <GuestProfileView />
      </SafeAreaView>
    );
  }

  return <ProfileView />;
}
