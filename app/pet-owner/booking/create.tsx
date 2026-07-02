import { useLocalSearchParams } from "expo-router";
import React from "react";

import { BookingScheduleView } from "@/features/pet-owner/booking-flow/select-schedule/views/BookingScheduleView";

export default function BookingCreateScreen() {
  const { serviceId } = useLocalSearchParams();

  return (
    <BookingScheduleView
      serviceId={typeof serviceId === "string" ? serviceId : ""}
    />
  );
}
