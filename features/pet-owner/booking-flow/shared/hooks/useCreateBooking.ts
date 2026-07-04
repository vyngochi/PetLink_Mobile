import { useMutation } from "@tanstack/react-query";

import { bookingService } from "@/features/pet-owner/booking-flow/shared/services/booking.service";
import type { CreateBookingPayload } from "@/features/pet-owner/booking-flow/shared/types";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: (payload: CreateBookingPayload) =>
      bookingService.createBooking(payload),
  });
};
