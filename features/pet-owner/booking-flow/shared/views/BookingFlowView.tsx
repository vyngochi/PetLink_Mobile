import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  BOOKING_STEP_FLOW,
  useBookingFlowStore,
} from "@/features/pet-owner/booking-flow/shared/stores/booking-flow.store";
import { BookingStepper } from "@/features/pet-owner/booking-flow/shared/components";
import { BookingReviewView } from "@/features/pet-owner/booking-flow/review/views/BookingReviewView";
import { BookingScheduleView } from "@/features/pet-owner/booking-flow/select-schedule/views/BookingScheduleView";
import { BookingSuccessView } from "@/features/pet-owner/booking-flow/success/views/BookingSuccessView";

interface BookingFlowViewProps {
  serviceId: string;
}

const STEP_TITLES = {
  schedule: "Đặt lịch hẹn",
  review: "Xác nhận đặt lịch",
  success: "Hoàn tất",
} as const;

export function BookingFlowView({ serviceId }: BookingFlowViewProps) {
  const router = useRouter();
  const step = useBookingFlowStore((state) => state.step);
  const startFlow = useBookingFlowStore((state) => state.startFlow);
  const prevStep = useBookingFlowStore((state) => state.prevStep);

  useEffect(() => {
    startFlow(serviceId);
  }, [serviceId, startFlow]);

  if (step === "success") {
    return <BookingSuccessView />;
  }

  const currentStep = BOOKING_STEP_FLOW.indexOf(step) + 1;

  const handleBack = () => {
    if (step === "schedule") {
      router.back();
      return;
    }
    prevStep();
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <BookingStepper
        title={STEP_TITLES[step]}
        currentStep={currentStep}
        totalSteps={BOOKING_STEP_FLOW.length}
        onBack={handleBack}
      />

      {step === "schedule" ? (
        <BookingScheduleView serviceId={serviceId} />
      ) : (
        <BookingReviewView />
      )}
    </SafeAreaView>
  );
}
