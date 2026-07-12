import { BOOKING_DETAILS_MOCK } from "@/features/pet-owner/booking-detail/constants/booking-details-mock";
import type { BookingDetail } from "@/features/pet-owner/booking-detail/types";
import { BOOKINGS_MOCK } from "@/features/pet-owner/bookings/constants/bookings-mock";

export function useBookingDetail(bookingId: string) {
  const booking = BOOKINGS_MOCK.find((item) => item.id === bookingId);
  const extra = BOOKING_DETAILS_MOCK[bookingId];

  const detail: BookingDetail | null =
    booking && extra ? { ...booking, ...extra } : null;

  return { detail };
}
