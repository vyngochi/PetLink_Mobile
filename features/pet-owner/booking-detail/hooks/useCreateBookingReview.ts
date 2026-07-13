import { useMutation, useQueryClient } from "@tanstack/react-query";

import { providerDetailKeys } from "@/features/pet-owner/provider-detail/shared/constants/query-keys";
import { bookingKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { bookingService } from "@/features/pet-owner/shared/services/booking.service";
import type { CreateBookingReviewPayload } from "@/features/pet-owner/shared/types/booking.type";

type CreateBookingReviewVariables = {
  bookingId: string;
  providerId: string;
  payload: CreateBookingReviewPayload;
};

export function useCreateBookingReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, payload }: CreateBookingReviewVariables) =>
      bookingService.createBookingReview(bookingId, payload),
    onSuccess: (_res, { bookingId, providerId }) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.myBookings() });
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(bookingId) });
      queryClient.invalidateQueries({
        queryKey: providerDetailKeys.reviews(providerId),
      });
      queryClient.invalidateQueries({
        queryKey: providerDetailKeys.details(),
      });
    },
  });
}
