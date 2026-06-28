import { useLocalSearchParams } from "expo-router";
import React from "react";

import { EditPetProfileView } from "@/features/pet-owner/pet-edit/views/EditPetProfileView";

export default function EditPetProfileScreen() {
  const { id } = useLocalSearchParams();
  const petId = typeof id === "string" ? id : "";

  return <EditPetProfileView petId={petId} />;
}
