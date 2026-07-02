import { useState } from "react";

import { BOOKINGS_MOCK } from "@/features/pet-owner/bookings/constants/bookings-mock";
import type { Booking } from "@/features/pet-owner/bookings/types";

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS_MOCK);

  const upcoming = bookings.filter(
    (item) => item.status === "confirmed" || item.status === "pending"
  );
  const past = bookings.filter(
    (item) => item.status === "completed" || item.status === "cancelled"
  );

  const cancelBooking = (id: string) => {
    setBookings((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "cancelled" } : item
      )
    );
  };

  return { upcoming, past, cancelBooking };
}
