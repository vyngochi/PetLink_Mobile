import type { Booking } from "@/features/pet-owner/bookings/types";
import type {
  ApiBookingReview,
  BookingQrAction,
} from "@/features/pet-owner/shared/types/booking.type";

export interface BookingDetail extends Booking {
  reference: string;
  price: string;
  dateLabel: string;
  timeLabel: string;
  providerId: string;
  providerAddress: string;
  providerImageUrl: string;
  qrAction: BookingQrAction | null;
  review: ApiBookingReview | null;
  note: string | null;
  cancelReason: string | null;
  refundReason: string | null;
}
