import { useLocalSearchParams } from "expo-router";
import React from "react";

import { PetFormView } from "@/features/pet-owner/pet-edit/views/PetFormView";

export default function EditPetProfileScreen() {
  const { id } = useLocalSearchParams();
  const petId = typeof id === "string" ? id : "";

  return <PetFormView petId={petId} />;
}
