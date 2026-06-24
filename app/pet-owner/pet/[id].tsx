import { PetDetailView } from "@/features/pet-owner/pet-detail/views/PetDetailView";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function PetDetailScreen() {
  const { id } = useLocalSearchParams();
  const petId = typeof id === "string" ? id : "";

  return <PetDetailView petId={petId} />;
}
