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
  providerId: string;
  providerName: string;
  services: BookingServiceOption[];
  days: BookingDayOption[];
}

export interface CreateBookingInput {
  providerId: string;
  serviceId: string;
  petId: string;
  petName: string;
  appointmentStart: string;
  paymentMethod?: string;
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
