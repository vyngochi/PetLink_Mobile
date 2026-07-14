import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bookingKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { bookingService } from "@/features/pet-owner/shared/services/booking.service";

type CancelBookingVariables = {
  bookingId: string;
  reason: string;
};

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, reason }: CancelBookingVariables) =>
      bookingService.cancelMyBooking(bookingId, reason),
    onSuccess: (_res, { bookingId }) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.myBookings() });
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(bookingId) });
    },
  });
}
