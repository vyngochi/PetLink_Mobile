import { GuestProfileView } from "@/features/guest/guest-profile/views/GuestProfileView";
import { ProfileView } from "@/features/pet-owner/profile/views/ProfileView";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function profile() {
  const isLogged = false;

  if (isLogged) {
    return <ProfileView />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <GuestProfileView />
    </SafeAreaView>
  );
}
