export type BookingTab = "upcoming" | "past";

export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";

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
