import type { ApiBookingProvider } from "@/features/pet-owner/shared/types/booking.type";

const DAY_LABELS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

const MEDICAL_KEYWORDS = ["khám", "tiêm", "xét nghiệm", "siêu âm"];

const pad = (value: number) => String(value).padStart(2, "0");

export const formatAppointmentTime = (iso: string) => {
  const date = new Date(iso);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export const formatAppointmentDate = (iso: string) => {
  const date = new Date(iso);
  return `${DAY_LABELS[date.getDay()]}, ${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
};

export const formatAppointmentLabel = (iso: string) => {
  const date = new Date(iso);
  return `${DAY_LABELS[date.getDay()]}, ${pad(date.getDate())}/${pad(date.getMonth() + 1)}, ${formatAppointmentTime(iso)}`;
};

export const formatAppointmentTimeRange = (startIso: string, endIso: string) =>
  `${formatAppointmentTime(startIso)} - ${formatAppointmentTime(endIso)}`;

export const getBookingReference = (bookingId: string) =>
  bookingId.slice(-6).toUpperCase();

export const formatProviderAddress = (provider: ApiBookingProvider) =>
  [provider.address, provider.ward, provider.district, provider.province]
    .filter(Boolean)
    .join(", ");

export const getServiceKind = (serviceName: string): "medical" | "grooming" =>
  MEDICAL_KEYWORDS.some((keyword) =>
    serviceName.toLowerCase().includes(keyword),
  )
    ? "medical"
    : "grooming";
