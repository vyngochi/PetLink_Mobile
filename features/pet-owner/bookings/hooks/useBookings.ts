import { useQuery } from "@tanstack/react-query";

import {
  isUpcomingBooking,
  toBooking,
} from "@/features/pet-owner/bookings/utils/booking-mapper";
import { useGetMyPets } from "@/features/pet-owner/my-pets/hooks/useGetMyPets";
import { bookingKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { useBookingRealtime } from "@/features/pet-owner/shared/hooks/useBookingRealtime";
import { useRefreshOnFocus } from "@/features/pet-owner/shared/hooks/useRefreshOnFocus";
import { bookingService } from "@/features/pet-owner/shared/services/booking.service";
import type { BookingListResponse } from "@/features/pet-owner/shared/types/booking.type";
import { unwrapData } from "@/lib/http";

const BOOKINGS_PAGE_SIZE = 50;

export function useBookings() {
  const { pets } = useGetMyPets();
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: bookingKeys.myBookings(),
    queryFn: () =>
      bookingService.getMyBookings({ pageSize: BOOKINGS_PAGE_SIZE }),
    select: (res) => unwrapData<BookingListResponse>(res),
  });

  useRefreshOnFocus(refetch);
  useBookingRealtime();

  const bookings = (data?.items ?? []).map((item) => toBooking(item, pets));

  const upcoming = bookings.filter((item) => isUpcomingBooking(item.status));
  const past = bookings.filter((item) => !isUpcomingBooking(item.status));

  return { upcoming, past, isLoading, isError, error, refetch, isRefetching };
}
