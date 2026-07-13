import { HomeView } from "@/features/pet-owner/home/views/HomeView";
import { useAuth } from "@/lib/auth";
import React from "react";
import { View } from "react-native";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <View className="flex-1 bg-background">
      <HomeView isLoggedIn={isAuthenticated} />
    </View>
  );
}
