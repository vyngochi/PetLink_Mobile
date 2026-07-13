import { ProviderListView } from "@/features/pet-owner/provider-list/views/ProviderListView";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProvidersTabScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ProviderListView />
    </SafeAreaView>
  );
}
