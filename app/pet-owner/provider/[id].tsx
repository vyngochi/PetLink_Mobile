import { ServicesListView } from "@/features/pet-owner/provider-detail/services-list/views/ServicesListView";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function ProviderDetailScreen() {
  const { id } = useLocalSearchParams();
  const providerId = typeof id === "string" ? id : "";

  return <ServicesListView providerId={providerId} />;
}
