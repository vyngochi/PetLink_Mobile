import { useQuery } from "@tanstack/react-query";

import type { BookingTimeSlot } from "@/features/pet-owner/booking-flow/shared/types";
import { bookingKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { bookingService } from "@/features/pet-owner/shared/services/booking.service";
import type { AvailableSlotsResponse } from "@/features/pet-owner/shared/types/booking.type";
import { formatAppointmentTime } from "@/features/pet-owner/shared/utils/booking-format";
import { unwrapData } from "@/lib/http";

export const useAvailableSlots = (
  providerId: string | null,
  serviceId: string | null,
  date: string | null,
) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: bookingKeys.availableSlots(
      providerId ?? "",
      serviceId ?? "",
      date ?? "",
    ),
    queryFn: async () => {
      const response = await bookingService.getAvailableSlots(
        providerId as string,
        serviceId as string,
        date as string,
      );
      return unwrapData<AvailableSlotsResponse>(response);
    },
    select: (result): BookingTimeSlot[] =>
      result.slots.map((slot) => ({
        id: slot.startAt,
        label: formatAppointmentTime(slot.startAt),
        available: true,
      })),
    enabled: Boolean(providerId && serviceId && date),
  });

  return { timeSlots: data ?? [], isLoading, isError, error, refetch };
};
