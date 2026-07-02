import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { toast } from "@/components/toast";
import {
  BookingBottomBar,
  BookingStepHeader,
} from "@/features/pet-owner/booking-flow/shared/components";
import { useBookingOptions } from "@/features/pet-owner/booking-flow/shared/hooks/useBookingOptions";
import { useBookingFlowStore } from "@/features/pet-owner/booking-flow/shared/stores/booking-flow.store";
import { formatCurrency } from "@/features/pet-owner/booking-flow/shared/utils/currency";
import {
  DayStrip,
  PetSelector,
  ServiceOptionList,
  TimeSlotGrid,
} from "@/features/pet-owner/booking-flow/select-schedule/components";
import { Colors } from "@/constants/theme";

interface BookingScheduleViewProps {
  serviceId: string;
}

export function BookingScheduleView({ serviceId }: BookingScheduleViewProps) {
  const router = useRouter();
  const { data: options, isLoading } = useBookingOptions(serviceId);
  const {
    serviceId: selectedServiceId,
    petId,
    dayId,
    timeSlotId,
    startFlow,
    selectService,
    selectPet,
    selectDay,
    selectTimeSlot,
  } = useBookingFlowStore();

  useEffect(() => {
    startFlow(serviceId);
  }, [serviceId, startFlow]);

  useEffect(() => {
    if (!options) return;

    const state = useBookingFlowStore.getState();
    if (!state.petId && options.pets[0]) {
      state.selectPet(options.pets[0].id);
    }
    if (!state.dayId && options.days[0]) {
      state.selectDay(options.days[0].id);
    }
    if (!state.timeSlotId) {
      const firstAvailable = options.timeSlots.find((slot) => slot.available);
      if (firstAvailable) {
        state.selectTimeSlot(firstAvailable.id);
      }
    }
  }, [options]);

  const selectedService = options?.services.find(
    (service) => service.id === selectedServiceId,
  );
  const canContinue = Boolean(
    selectedServiceId && petId && dayId && timeSlotId,
  );

  const handleAddPet = () => {
    toast.info("Tính năng đang được phát triển", { position: "bottom" });
  };

  const handleNext = () => {
    router.push("/pet-owner/booking/review");
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <BookingStepHeader title="Đặt lịch hẹn" step={1} />

      {isLoading || !options ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={Colors.light.tint} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-7 pb-10 pt-5"
        >
          <View className="gap-4">
            <Text className="px-5 font-mbold text-[17px] text-foreground">
              Chọn thú cưng
            </Text>
            <PetSelector
              pets={options.pets}
              selectedPetId={petId}
              onSelect={selectPet}
              onAddPet={handleAddPet}
            />
          </View>

          <View className="gap-4">
            <Text className="px-5 font-mbold text-[17px] text-foreground">
              Chọn dịch vụ
            </Text>
            <ServiceOptionList
              services={options.services}
              selectedServiceId={selectedServiceId}
              onSelect={selectService}
            />
          </View>

          <View className="gap-4">
            <Text className="px-5 font-mbold text-[17px] text-foreground">
              Chọn ngày & giờ
            </Text>
            <DayStrip
              days={options.days}
              selectedDayId={dayId}
              onSelect={selectDay}
            />
            <TimeSlotGrid
              timeSlots={options.timeSlots}
              selectedTimeSlotId={timeSlotId}
              onSelect={selectTimeSlot}
            />
          </View>
        </ScrollView>
      )}

      <BookingBottomBar
        totalLabel={selectedService ? formatCurrency(selectedService.price) : "—"}
        ctaLabel="Tiếp tục"
        onPress={handleNext}
        disabled={!canContinue}
      />
    </SafeAreaView>
  );
}
