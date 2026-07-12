import type { BookingDetailExtra } from "@/features/pet-owner/booking-detail/types";

const CLINIC_IMAGE =
  "https://lh3.googleusercontent.com/aida/AP1WRLt_wn4NYqVMPR2nozwWxACGx7MZ8aCzaIBgxyXS8qrdqFzjPbvVfxkWBuVFi1DtpuCWz3mVGX8l4y6RaXoSVZ7ReOjV89_cVZVFhTteBxSjb65LBEGDhR5FXbV8rXtxLjTQQOwUq-ahmPpWpGmE9Hsyakoedi-_jWu-anDw27Xs5xuQ9cRnZmZGxuYpLzdktKuHLH87J-BO_FG9r-V-1kIquov-fbEesweBKAfmM08yuiu8g3gNA71G5DU";

export const BOOKING_DETAILS_MOCK: Record<string, BookingDetailExtra> = {
  "booking-bella-checkup": {
    reference: "PL-482193",
    price: "500.000₫",
    dateLabel: "Ngày mai · 12 Th7",
    timeLabel: "10:00 SA",
    providerAddress: "123 Pet Lane, Quận 1",
    providerImageUrl: CLINIC_IMAGE,
    checkInCode: "PETLINK-CHECKIN-PL-482193",
  },
  "booking-luna-grooming": {
    reference: "PL-482207",
    price: "350.000₫",
    dateLabel: "24 Th10",
    timeLabel: "14:30",
    providerAddress: "45 Nguyễn Huệ, Quận 1",
    providerImageUrl: CLINIC_IMAGE,
    checkInCode: "PETLINK-CHECKIN-PL-482207",
  },
  "booking-bella-vaccine": {
    reference: "PL-473002",
    price: "250.000₫",
    dateLabel: "12 Th6",
    timeLabel: "09:00 SA",
    providerAddress: "123 Pet Lane, Quận 1",
    providerImageUrl: CLINIC_IMAGE,
    checkInCode: "PETLINK-CHECKIN-PL-473002",
  },
  "booking-luna-bath": {
    reference: "PL-471890",
    price: "150.000₫",
    dateLabel: "02 Th6",
    timeLabel: "15:00",
    providerAddress: "78 Lê Lợi, Quận 3",
    providerImageUrl: CLINIC_IMAGE,
    checkInCode: "PETLINK-CHECKIN-PL-471890",
  },
};
