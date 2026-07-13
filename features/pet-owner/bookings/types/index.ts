export type BookingTab = "upcoming" | "past";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "checked_in"
  | "checked_out"
  | "completed"
  | "cancelled"
  | "rejected"
  | "dispute"
  | "no_arrival";

export type BookingServiceType = "medical" | "grooming";

export interface Booking {
  id: string;
  serviceId: string;
  petId: string;
  petName: string;
  petBreed: string;
  petImageUrl: string;
  status: BookingStatus;
  scheduledAtLabel: string;
  serviceName: string;
  serviceType: BookingServiceType;
  providerName: string;
}
