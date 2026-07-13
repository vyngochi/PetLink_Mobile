import { useLocalSearchParams } from "expo-router";
import React from "react";

import { BookingFlowView } from "@/features/pet-owner/booking-flow/shared/views/BookingFlowView";

export default function BookingCreateScreen() {
  const { serviceId, petId } = useLocalSearchParams();

  return (
    <BookingFlowView
      serviceId={typeof serviceId === "string" ? serviceId : ""}
      petId={typeof petId === "string" ? petId : undefined}
    />
  );
}
