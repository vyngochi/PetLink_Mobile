import api from "@/api/client";
import type {
  BookingQrAction,
  CreateBookingApiPayload,
  CreateBookingDisputePayload,
  CreateBookingReviewPayload,
  GetMyBookingsParams,
} from "@/features/pet-owner/shared/types/booking.type";

export const bookingService = {
  createBooking: (payload: CreateBookingApiPayload) => {
    return api.post("/mobile/bookings", payload);
  },
  getMyBookings: (params: GetMyBookingsParams = {}) => {
    return api.get("/mobile/me/bookings", { params });
  },
  getMyBookingDetail: (bookingId: string) => {
    return api.get(`/mobile/me/bookings/${bookingId}`);
  },
  cancelMyBooking: (bookingId: string, reason?: string) => {
    return api.patch(`/mobile/bookings/${bookingId}/cancel`, { reason });
  },
  createBookingReview: (
    bookingId: string,
    payload: CreateBookingReviewPayload,
  ) => {
    return api.post(`/mobile/bookings/${bookingId}/reviews`, payload);
  },
  createBookingDispute: (
    bookingId: string,
    payload: CreateBookingDisputePayload,
  ) => {
    if (payload.evidenceFiles && payload.evidenceFiles.length > 0) {
      const formData = new FormData();
      formData.append("reason", payload.reason);
      if (payload.description) {
        formData.append("description", payload.description);
      }

      payload.evidenceFiles.forEach((uri) => {
        // We will need to import appendImageFile or duplicate its logic.
        // It's better to import it. I'll add the import via multi_replace later or here.
        // But since this is a single replace block, I should probably do multi_replace.
        const name = uri.split("/").pop()?.split("?")[0] || "evidence.jpg";
        const extension = name.split(".").pop()?.toLowerCase() || "jpg";
        const MIME_TYPES: Record<string, string> = {
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          png: "image/png",
          webp: "image/webp",
          heic: "image/heic",
          heif: "image/heif",
        };
        const mimeType = MIME_TYPES[extension] || "image/jpeg";

        formData.append("evidenceFiles", {
          uri,
          name,
          type: mimeType,
        } as any);
      });

      return api.post(`/mobile/bookings/${bookingId}/disputes`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    return api.post(`/mobile/bookings/${bookingId}/disputes`, payload);
  },
  getMyBookingQr: (bookingId: string, action: BookingQrAction) => {
    return api.get(`/mobile/me/bookings/${bookingId}/qr`, {
      params: { action },
    });
  },
  getAvailableSlots: (providerId: string, serviceId: string, date: string) => {
    return api.get(`/mobile/providers/${providerId}/available-slots`, {
      params: { serviceId, date },
    });
  },
  createMomoPayment: (bookingId: string) => {
    return api.post(`/mobile/bookings/${bookingId}/momo/create-payment`);
  },
};
