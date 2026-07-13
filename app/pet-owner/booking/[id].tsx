import { useLocalSearchParams } from "expo-router";
import React from "react";

import { BookingDetailView } from "@/features/pet-owner/booking-detail/views/BookingDetailView";

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams();
  const bookingId = typeof id === "string" ? id : "";

  return <BookingDetailView bookingId={bookingId} />;
}
