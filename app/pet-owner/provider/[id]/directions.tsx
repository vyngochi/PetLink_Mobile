import React from "react";
import { useLocalSearchParams } from "expo-router";
import { DirectionsView } from "@/features/pet-owner/directions/views/DirectionsView";

export default function ProviderDirectionsScreen() {
  const { id } = useLocalSearchParams();
  const providerId = typeof id === "string" ? id : "";

  return <DirectionsView providerId={providerId} />;
}
