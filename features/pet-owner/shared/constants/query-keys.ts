import type { LatLng } from "../services/routing.service";

export const bookingKeys = {
  all: ["bookings"] as const,
  lists: () => [...bookingKeys.all, "list"] as const,
  myBookings: () => [...bookingKeys.lists(), "my-bookings"] as const,
  details: () => [...bookingKeys.all, "detail"] as const,
  detail: (bookingId: string) => [...bookingKeys.details(), bookingId] as const,
  qr: (bookingId: string, action: string) =>
    [...bookingKeys.all, "qr", bookingId, action] as const,
  availableSlots: (providerId: string, serviceId: string, date: string) =>
    [...bookingKeys.all, "available-slots", providerId, serviceId, date] as const,
};

export const routeKeys = {
  all: ["routes"] as const,
  driving: (from: LatLng | undefined, to: LatLng | undefined) =>
    [
      ...routeKeys.all,
      "driving",
      from ? `${from.lat},${from.lng}` : "no-origin",
      to ? `${to.lat},${to.lng}` : "no-destination",
    ] as const,
};

export const petKeys = {
  all: ["pets"] as const,
  lists: () => [...petKeys.all, "list"] as const,
  myPets: () => [...petKeys.lists(), "my-pets"] as const,
  details: () => [...petKeys.all, "detail"] as const,
  detail: (petId: string) => [...petKeys.details(), petId] as const,
};
