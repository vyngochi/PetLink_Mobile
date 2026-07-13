import { useQuery } from "@tanstack/react-query";

import type { BookingDetail } from "@/features/pet-owner/booking-detail/types";
import { toBooking } from "@/features/pet-owner/bookings/utils/booking-mapper";
import { useGetMyPets } from "@/features/pet-owner/my-pets/hooks/useGetMyPets";
import { bookingKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { useBookingRealtime } from "@/features/pet-owner/shared/hooks/useBookingRealtime";
import { useRefreshOnFocus } from "@/features/pet-owner/shared/hooks/useRefreshOnFocus";
import { bookingService } from "@/features/pet-owner/shared/services/booking.service";
import type {
  ApiBooking,
  ApiBookingStatus,
  BookingQrAction,
} from "@/features/pet-owner/shared/types/booking.type";
import {
  formatAppointmentDate,
  formatAppointmentTimeRange,
  formatProviderAddress,
  getBookingReference,
} from "@/features/pet-owner/shared/utils/booking-format";
import { formatCurrency } from "@/lib/helper/formatCurrency";
import { unwrapData } from "@/lib/http";

const toQrAction = (status: ApiBookingStatus): BookingQrAction | null => {
  if (status === "CONFIRMED") return "CHECK_IN";
  if (status === "CHECKED_IN") return "CHECK_OUT";
  return null;
};

export function useBookingDetail(bookingId: string) {
  const { pets } = useGetMyPets();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: bookingKeys.detail(bookingId),
    queryFn: () => bookingService.getMyBookingDetail(bookingId),
    select: (res) => unwrapData<ApiBooking>(res),
    enabled: Boolean(bookingId),
    staleTime: 0,
  });

  useRefreshOnFocus(refetch);
  useBookingRealtime(bookingId);

  const detail: BookingDetail | null = data
    ? {
        ...toBooking(data, pets),
        reference: getBookingReference(data.id),
        price: formatCurrency(data.totalAmount),
        dateLabel: formatAppointmentDate(data.appointmentStart),
        timeLabel: formatAppointmentTimeRange(
          data.appointmentStart,
          data.appointmentEnd,
        ),
        providerId: data.providerId,
        providerAddress: formatProviderAddress(data.provider),
        providerImageUrl: data.provider.avatarUrl ?? "",
        qrAction: toQrAction(data.status),
        review: data.review ?? null,
      }
    : null;

  return { detail, isLoading, isError, error, refetch };
}
