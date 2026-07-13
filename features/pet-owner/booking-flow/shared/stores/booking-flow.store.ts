import { create } from "zustand";

import type { ConfirmedBooking } from "@/features/pet-owner/booking-flow/shared/types";

export const BOOKING_STEP_FLOW = ["schedule", "review", "success"] as const;

export type BookingStep = (typeof BOOKING_STEP_FLOW)[number];

interface BookingFlowState {
  step: BookingStep;
  serviceId: string | null;
  petId: string | null;
  dayId: string | null;
  timeSlotId: string | null;
  paymentCardId: string | null;
  confirmedBooking: ConfirmedBooking | null;
  startFlow: (serviceId: string, petId?: string | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  selectService: (serviceId: string) => void;
  selectPet: (petId: string) => void;
  selectDay: (dayId: string) => void;
  selectTimeSlot: (timeSlotId: string) => void;
  selectPaymentCard: (paymentCardId: string) => void;
  setConfirmedBooking: (confirmedBooking: ConfirmedBooking) => void;
  reset: () => void;
}

const initialState = {
  step: "schedule" as BookingStep,
  serviceId: null,
  petId: null,
  dayId: null,
  timeSlotId: null,
  paymentCardId: null,
  confirmedBooking: null,
};

export const useBookingFlowStore = create<BookingFlowState>((set) => ({
  ...initialState,
  startFlow: (serviceId, petId = null) =>
    set({ ...initialState, serviceId, petId }),
  nextStep: () =>
    set((state) => {
      const index = BOOKING_STEP_FLOW.indexOf(state.step);
      const nextIndex = Math.min(index + 1, BOOKING_STEP_FLOW.length - 1);
      return { step: BOOKING_STEP_FLOW[nextIndex] };
    }),
  prevStep: () =>
    set((state) => {
      const index = BOOKING_STEP_FLOW.indexOf(state.step);
      const prevIndex = Math.max(index - 1, 0);
      return { step: BOOKING_STEP_FLOW[prevIndex] };
    }),
  selectService: (serviceId) => set({ serviceId, timeSlotId: null }),
  selectPet: (petId) => set({ petId }),
  selectDay: (dayId) => set({ dayId, timeSlotId: null }),
  selectTimeSlot: (timeSlotId) => set({ timeSlotId }),
  selectPaymentCard: (paymentCardId) => set({ paymentCardId }),
  setConfirmedBooking: (confirmedBooking) => set({ confirmedBooking }),
  reset: () => set(initialState),
}));
