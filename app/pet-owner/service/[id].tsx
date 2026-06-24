import { ServiceDetailView } from "@/features/pet-owner/provider-detail/service-detail/views/ServiceDetailView";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const serviceId = typeof id === "string" ? id : "";

  return <ServiceDetailView serviceId={serviceId} />;
}
