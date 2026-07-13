import { useMutation, useQueryClient } from "@tanstack/react-query";

import type {
  ConfirmedBooking,
  CreateBookingInput,
} from "@/features/pet-owner/booking-flow/shared/types";
import { chatService } from "@/features/pet-owner/chat/shared/services/chat.service";
import { bookingKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { bookingService } from "@/features/pet-owner/shared/services/booking.service";
import type { ApiBooking } from "@/features/pet-owner/shared/types/booking.type";
import {
  formatAppointmentLabel,
  getBookingReference,
} from "@/features/pet-owner/shared/utils/booking-format";
import { unwrapData } from "@/lib/http";

const toConfirmedBooking = (
  booking: ApiBooking,
  petName: string,
): ConfirmedBooking => ({
  id: booking.id,
  reference: getBookingReference(booking.id),
  petName,
  serviceName: booking.service.name,
  providerName: booking.provider.businessName,
  scheduledAtLabel: formatAppointmentLabel(booking.appointmentStart),
  totalPrice: booking.totalAmount,
});

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ petName, ...payload }: CreateBookingInput) => {
      const response = await bookingService.createBooking({
        ...payload,
        paymentMethod: "CASH",
      });
      try {
        await chatService.getOrCreateThread(response.data.data.id);
      } catch (error) {
        throw error;
      }
      return toConfirmedBooking(unwrapData<ApiBooking>(response), petName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.myBookings() });
    },
  });
};
