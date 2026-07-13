import type {
  Booking,
  BookingStatus,
} from "@/features/pet-owner/bookings/types";
import type { Pet } from "@/features/pet-owner/my-pets/types";
import type {
  ApiBooking,
  ApiBookingStatus,
} from "@/features/pet-owner/shared/types/booking.type";
import {
  formatAppointmentLabel,
  getServiceKind,
} from "@/features/pet-owner/shared/utils/booking-format";

const STATUS_MAP: Record<ApiBookingStatus, BookingStatus> = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CHECKED_IN: "checked_in",
  CHECKED_OUT: "checked_out",
  COMPLETED: "completed",
  DISPUTE: "dispute",
  CANCELLED: "cancelled",
  REJECTED: "rejected",
  NO_ARRIVAL: "no_arrival",
};

export const toBookingStatus = (status: ApiBookingStatus): BookingStatus =>
  STATUS_MAP[status] ?? "pending";

const UPCOMING_STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
  "checked_in",
];

const MODIFIABLE_STATUSES: BookingStatus[] = ["pending", "confirmed"];

const IN_PROGRESS_STATUSES: BookingStatus[] = [
  "checked_in",
  "checked_out",
  "dispute",
];

export const isUpcomingBooking = (status: BookingStatus) =>
  UPCOMING_STATUSES.includes(status);

export const canModifyBooking = (status: BookingStatus) =>
  MODIFIABLE_STATUSES.includes(status);

export const isInProgressBooking = (status: BookingStatus) =>
  IN_PROGRESS_STATUSES.includes(status);

export const toBooking = (booking: ApiBooking, pets: Pet[]): Booking => {
  const pet = pets.find((item) => item.id === booking.petId);

  return {
    id: booking.id,
    serviceId: booking.serviceId,
    petId: booking.petId ?? "",
    petName: pet?.name ?? "Thú cưng",
    petBreed: pet?.breed ?? "",
    petImageUrl: pet?.imageUrl ?? booking.service.imageUrls[0] ?? "",
    status: toBookingStatus(booking.status),
    scheduledAtLabel: formatAppointmentLabel(booking.appointmentStart),
    serviceName: booking.service.name,
    serviceType: getServiceKind(booking.service.name),
    providerName: booking.provider.businessName,
  };
};
