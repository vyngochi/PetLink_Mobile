import { useQuery } from "@tanstack/react-query";

import { bookingService } from "@/features/pet-owner/booking-flow/shared/services/booking.service";

export const useBookingOptions = (serviceId: string) => {
  return useQuery({
    queryKey: ["booking-options", serviceId],
    queryFn: () => bookingService.getBookingOptions(serviceId),
    enabled: serviceId.length > 0,
  });
};
