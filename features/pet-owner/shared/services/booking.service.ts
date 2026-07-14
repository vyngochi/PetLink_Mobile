import api from "@/api/client";
import type {
  BookingQrAction,
  CreateBookingApiPayload,
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
  createBookingReview: (bookingId: string, payload: CreateBookingReviewPayload) => {
    return api.post(`/mobile/bookings/${bookingId}/reviews`, payload);
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
