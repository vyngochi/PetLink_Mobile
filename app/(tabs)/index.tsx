import { HomeView } from "@/features/pet-owner/home/views/HomeView";
import React from "react";
import { View } from "react-native";

export default function Home() {
  // const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <HomeView />
    </View>
  );
}
