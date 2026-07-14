import { useQuery } from "@tanstack/react-query";

import { disputeService } from "@/features/pet-owner/disputes/services/dispute.service";
import type { ApiBookingDispute } from "@/features/pet-owner/shared/types/booking.type";
import { unwrapData } from "@/lib/http";

export const disputeKeys = {
  all: ["disputes"] as const,
  lists: () => [...disputeKeys.all, "list"] as const,
  list: (params: string) => [...disputeKeys.lists(), params] as const,
  details: () => [...disputeKeys.all, "detail"] as const,
  detail: (id: string) => [...disputeKeys.details(), id] as const,
};

export function useDisputeDetail(disputeId: string) {
  return useQuery({
    queryKey: disputeKeys.detail(disputeId),
    queryFn: async () => {
      const response = await disputeService.getMyDisputeDetail(disputeId);
      return unwrapData<ApiBookingDispute>(response);
    },
    enabled: !!disputeId,
  });
}

export function useDisputeByBookingId(bookingId: string) {
  return useQuery({
    queryKey: [...disputeKeys.lists(), { bookingId }],
    queryFn: async () => {
      const response = await disputeService.getMyDisputes({ bookingId });
      const data = unwrapData<{ items: ApiBookingDispute[] }>(response);
      const items = data?.items ?? [];
      return (items.length > 0 ? items[0] : null) as ApiBookingDispute | null;
    },
    enabled: !!bookingId,
  });
}
