import type { Booking } from "@/features/pet-owner/bookings/types";

export interface BookingDetail extends Booking {
  reference: string;
  price: string;
  dateLabel: string;
  timeLabel: string;
  providerAddress: string;
  providerImageUrl: string;
  checkInCode: string;
}

export type BookingDetailExtra = Pick<
  BookingDetail,
  | "reference"
  | "price"
  | "dateLabel"
  | "timeLabel"
  | "providerAddress"
  | "providerImageUrl"
  | "checkInCode"
>;
