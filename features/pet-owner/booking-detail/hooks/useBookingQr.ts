import { useQuery } from "@tanstack/react-query";

import { bookingKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { bookingService } from "@/features/pet-owner/shared/services/booking.service";
import type {
  BookingQrAction,
  BookingQrResponse,
} from "@/features/pet-owner/shared/types/booking.type";
import { unwrapData } from "@/lib/http";

const REFRESH_MARGIN_SECONDS = 60;

export function useBookingQr(
  bookingId: string,
  action: BookingQrAction | null,
) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: bookingKeys.qr(bookingId, action ?? ""),
    queryFn: async () => {
      const response = await bookingService.getMyBookingQr(
        bookingId,
        action as BookingQrAction,
      );
      return unwrapData<BookingQrResponse>(response);
    },
    enabled: Boolean(bookingId) && action !== null,
    staleTime: 0,
    refetchInterval: (query) => {
      const expiresInSeconds = query.state.data?.expiresInSeconds;
      if (!expiresInSeconds) return false;
      return Math.max(expiresInSeconds - REFRESH_MARGIN_SECONDS, 30) * 1000;
    },
  });

  return { qr: data ?? null, isLoading, isError, error, refetch };
}
