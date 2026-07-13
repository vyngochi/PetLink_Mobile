import { useRouter, type Href } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { BookingBottomBar } from "@/features/pet-owner/booking-flow/shared/components";
import { useAvailableSlots } from "@/features/pet-owner/booking-flow/shared/hooks/useAvailableSlots";
import { useBookingOptions } from "@/features/pet-owner/booking-flow/shared/hooks/useBookingOptions";
import { useBookingFlowStore } from "@/features/pet-owner/booking-flow/shared/stores/booking-flow.store";
import { formatCurrency } from "@/features/pet-owner/booking-flow/shared/utils/currency";
import {
  DayStrip,
  PetSelector,
  ServiceOptionList,
  TimeSlotGrid,
} from "@/features/pet-owner/booking-flow/select-schedule/components";
import { useGetMyPets } from "@/features/pet-owner/my-pets/hooks/useGetMyPets";

interface BookingScheduleViewProps {
  serviceId: string;
}

export function BookingScheduleView({ serviceId }: BookingScheduleViewProps) {
  const router = useRouter();
  const { data: options, isLoading } = useBookingOptions(serviceId);
  const { pets } = useGetMyPets();
  const {
    serviceId: selectedServiceId,
    petId,
    dayId,
    timeSlotId,
    selectService,
    selectPet,
    selectDay,
    selectTimeSlot,
    nextStep,
  } = useBookingFlowStore();

  const { timeSlots, isLoading: isSlotsLoading } = useAvailableSlots(
    options?.providerId ?? null,
    selectedServiceId,
    dayId,
  );

  useEffect(() => {
    if (!options) return;

    const state = useBookingFlowStore.getState();
    if (!state.dayId && options.days[0]) {
      state.selectDay(options.days[0].id);
    }
  }, [options]);

  useEffect(() => {
    const state = useBookingFlowStore.getState();
    if (!state.petId && pets[0]) {
      state.selectPet(pets[0].id);
    }
  }, [pets]);

  useEffect(() => {
    if (timeSlots.length === 0) return;

    const state = useBookingFlowStore.getState();
    const isSelectedValid = timeSlots.some(
      (slot) => slot.id === state.timeSlotId,
    );
    if (!isSelectedValid) {
      state.selectTimeSlot(timeSlots[0].id);
    }
  }, [timeSlots]);

  const selectedService = options?.services.find(
    (service) => service.id === selectedServiceId,
  );
  const canContinue = Boolean(
    selectedServiceId && petId && dayId && timeSlotId,
  );

  const handleAddPet = () => {
    router.push("/pet-owner/pet/create" as Href);
  };

  return (
    <>
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
              pets={pets}
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
            {isSlotsLoading ? (
              <View className="items-center py-6">
                <ActivityIndicator size="small" color={Colors.light.tint} />
              </View>
            ) : timeSlots.length === 0 ? (
              <Text className="px-5 py-4 text-center font-default text-[13px] leading-5 text-muted-foreground">
                Không có khung giờ trống trong ngày này, vui lòng chọn ngày khác
              </Text>
            ) : (
              <TimeSlotGrid
                timeSlots={timeSlots}
                selectedTimeSlotId={timeSlotId}
                onSelect={selectTimeSlot}
              />
            )}
          </View>
        </ScrollView>
      )}

      <BookingBottomBar
        totalLabel={selectedService ? formatCurrency(selectedService.price) : "—"}
        ctaLabel="Tiếp tục"
        onPress={nextStep}
        disabled={!canContinue}
      />
    </>
  );
}
