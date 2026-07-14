import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bookingKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { bookingService } from "@/features/pet-owner/shared/services/booking.service";
import type { CreateBookingDisputePayload } from "@/features/pet-owner/shared/types/booking.type";

type CreateBookingDisputeVariables = {
  bookingId: string;
  payload: CreateBookingDisputePayload;
};

export function useCreateBookingDispute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, payload }: CreateBookingDisputeVariables) =>
      bookingService.createBookingDispute(bookingId, payload),
    onSuccess: (_res, { bookingId }) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.myBookings() });
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(bookingId) });
    },
  });
}
