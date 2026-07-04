import {
  BOOKING_TIME_SLOTS,
  buildBookingDays,
} from "@/features/pet-owner/booking-flow/shared/constants/booking-flow-mock";
import type {
  BookingOptions,
  BookingServiceOption,
  ConfirmedBooking,
  CreateBookingPayload,
} from "@/features/pet-owner/booking-flow/shared/types";
import { myPets } from "@/features/pet-owner/my-pets/constants/pets";
import { paymentCards } from "@/features/pet-owner/payment-methods/constants/paymentMethods";
import type { PaymentCard } from "@/features/pet-owner/payment-methods/types";
import { MOCK_SERVICE_DETAILS } from "@/features/pet-owner/provider-detail/service-detail/constants/service-detail-mock";
import type { ServiceDetailItem } from "@/features/pet-owner/provider-detail/service-detail/types/service-detail.type";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const MEDICAL_KEYWORDS = ["khám", "tiêm", "xét nghiệm", "siêu âm"];

const toServiceOption = (service: ServiceDetailItem): BookingServiceOption => ({
  id: service.id,
  name: service.name,
  description: service.description ?? "",
  price: service.price,
  durationMinutes: service.durationMinutes,
  kind: MEDICAL_KEYWORDS.some((keyword) =>
    service.name.toLowerCase().includes(keyword),
  )
    ? "medical"
    : "grooming",
});

export const bookingService = {
  getBookingOptions: async (serviceId: string): Promise<BookingOptions> => {
    await delay(600);

    const currentService = MOCK_SERVICE_DETAILS.find(
      (service) => service.id === serviceId,
    );
    const providerServices = MOCK_SERVICE_DETAILS.filter(
      (service) =>
        !currentService || service.providerId === currentService.providerId,
    );

    return {
      providerName: (currentService ?? providerServices[0])?.providerName ?? "",
      pets: myPets.map((pet) => ({
        id: pet.id,
        name: pet.name,
        breed: pet.breed,
        imageUrl: pet.imageUrl,
      })),
      services: providerServices.map(toServiceOption),
      days: buildBookingDays(),
      timeSlots: BOOKING_TIME_SLOTS,
    };
  },

  getPaymentCards: async (): Promise<PaymentCard[]> => {
    await delay(400);
    return paymentCards;
  },

  createBooking: async (
    payload: CreateBookingPayload,
  ): Promise<ConfirmedBooking> => {
    await delay(900);

    const service = MOCK_SERVICE_DETAILS.find(
      (item) => item.id === payload.serviceId,
    );
    const pet = myPets.find((item) => item.id === payload.petId);
    const day = buildBookingDays().find((item) => item.id === payload.dayId);
    const slot = BOOKING_TIME_SLOTS.find(
      (item) => item.id === payload.timeSlotId,
    );

    if (!service || !pet || !day || !slot) {
      throw new Error("Thông tin đặt lịch không hợp lệ");
    }

    return {
      id: `booking-${Date.now()}`,
      reference: `PL-${Math.floor(100000 + Math.random() * 900000)}`,
      petName: pet.name,
      serviceName: service.name,
      providerName: service.providerName,
      scheduledAtLabel: `${day.fullLabel}, ${slot.label}`,
      totalPrice: service.price,
    };
  },
};
