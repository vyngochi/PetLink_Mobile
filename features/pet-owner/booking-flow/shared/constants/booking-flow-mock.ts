import type {
  BookingDayOption,
  BookingTimeSlot,
} from "@/features/pet-owner/booking-flow/shared/types";

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

export const BOOKING_TIME_SLOTS: BookingTimeSlot[] = [
  { id: "09:00", label: "09:00", available: true },
  { id: "10:00", label: "10:00", available: true },
  { id: "11:00", label: "11:00", available: true },
  { id: "13:00", label: "13:00", available: true },
  { id: "14:00", label: "14:00", available: true },
  { id: "15:00", label: "15:00", available: false },
];
