import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

import { DisputeDetailView } from "@/features/pet-owner/disputes/views/DisputeDetailView";

export default function DisputeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <DisputeDetailView disputeId={id} />;
}
