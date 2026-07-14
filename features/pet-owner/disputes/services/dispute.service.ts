import api from "@/api/client";
import type { ApiBookingDispute } from "@/features/pet-owner/shared/types/booking.type";

export const disputeService = {
  getMyDisputes: (params?: { page?: number; limit?: number; bookingId?: string }) => {
    return api.get("/mobile/customer/disputes", { params });
  },
  getMyDisputeDetail: (disputeId: string) => {
    return api.get(`/mobile/customer/disputes/${disputeId}`);
  },
};
