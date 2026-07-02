import { create } from "zustand";

import type { ConfirmedBooking } from "@/features/pet-owner/booking-flow/shared/types";

interface BookingFlowState {
  serviceId: string | null;
  petId: string | null;
  dayId: string | null;
  timeSlotId: string | null;
  paymentCardId: string | null;
  confirmedBooking: ConfirmedBooking | null;
  startFlow: (serviceId: string) => void;
  selectService: (serviceId: string) => void;
  selectPet: (petId: string) => void;
  selectDay: (dayId: string) => void;
  selectTimeSlot: (timeSlotId: string) => void;
  selectPaymentCard: (paymentCardId: string) => void;
  setConfirmedBooking: (confirmedBooking: ConfirmedBooking) => void;
  reset: () => void;
}

const initialState = {
  serviceId: null,
  petId: null,
  dayId: null,
  timeSlotId: null,
  paymentCardId: null,
  confirmedBooking: null,
};

export const useBookingFlowStore = create<BookingFlowState>((set) => ({
  ...initialState,
  startFlow: (serviceId) => set({ ...initialState, serviceId }),
  selectService: (serviceId) => set({ serviceId }),
  selectPet: (petId) => set({ petId }),
  selectDay: (dayId) => set({ dayId }),
  selectTimeSlot: (timeSlotId) => set({ timeSlotId }),
  selectPaymentCard: (paymentCardId) => set({ paymentCardId }),
  setConfirmedBooking: (confirmedBooking) => set({ confirmedBooking }),
  reset: () => set(initialState),
}));
