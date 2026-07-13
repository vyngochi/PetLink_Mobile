import type { BookingDayOption } from "@/features/pet-owner/booking-flow/shared/types";

const DAY_LABELS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export const buildBookingDays = (count = 7): BookingDayOption[] => {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);

    const dayLabel = DAY_LABELS[date.getDay()];
    const dateNumber = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return {
      id: `${date.getFullYear()}-${month}-${dateNumber}`,
      dayLabel,
      dateNumber,
      fullLabel: `${dayLabel}, ${dateNumber}/${month}`,
    };
  });
};
