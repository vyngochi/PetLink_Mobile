export type BookingServiceKind = "medical" | "grooming";

export interface BookingPetOption {
  id: string;
  name: string;
  breed: string;
  imageUrl: string;
}

export interface BookingServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  kind: BookingServiceKind;
}

export interface BookingDayOption {
  id: string;
  dayLabel: string;
  dateNumber: string;
  fullLabel: string;
}

export interface BookingTimeSlot {
  id: string;
  label: string;
  available: boolean;
}

export interface BookingOptions {
  providerName: string;
  pets: BookingPetOption[];
  services: BookingServiceOption[];
  days: BookingDayOption[];
  timeSlots: BookingTimeSlot[];
}

export interface CreateBookingPayload {
  serviceId: string;
  petId: string;
  dayId: string;
  timeSlotId: string;
  paymentCardId: string;
}

export interface ConfirmedBooking {
  id: string;
  reference: string;
  petName: string;
  serviceName: string;
  providerName: string;
  scheduledAtLabel: string;
  totalPrice: number;
}
