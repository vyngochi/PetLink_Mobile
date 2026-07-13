import { useQuery } from "@tanstack/react-query";

import { bookingService } from "@/features/pet-owner/booking-flow/shared/services/booking.service";

export const usePaymentCards = () => {
  return useQuery({
    queryKey: ["booking-payment-cards"],
    queryFn: () => bookingService.getPaymentCards(),
  });
};
