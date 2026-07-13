import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { toast } from "@/components/toast";
import { Colors } from "@/constants/theme";
import {
  BookingSummaryCard,
  PaymentCardPicker,
} from "@/features/pet-owner/booking-flow/review/components";
import { BookingBottomBar } from "@/features/pet-owner/booking-flow/shared/components";
import { useBookingOptions } from "@/features/pet-owner/booking-flow/shared/hooks/useBookingOptions";
import { useCreateBooking } from "@/features/pet-owner/booking-flow/shared/hooks/useCreateBooking";
import { usePaymentCards } from "@/features/pet-owner/booking-flow/shared/hooks/usePaymentCards";
import { useBookingFlowStore } from "@/features/pet-owner/booking-flow/shared/stores/booking-flow.store";
import { formatCurrency } from "@/features/pet-owner/booking-flow/shared/utils/currency";
import { useGetMyPets } from "@/features/pet-owner/my-pets/hooks/useGetMyPets";
import { formatAppointmentTime } from "@/features/pet-owner/shared/utils/booking-format";
import { getApiErrorMessage } from "@/lib/http";

export function BookingReviewView() {
  const router = useRouter();
  const {
    serviceId,
    petId,
    dayId,
    timeSlotId,
    paymentCardId,
    selectPaymentCard,
    setConfirmedBooking,
    nextStep,
  } = useBookingFlowStore();

  const { data: options } = useBookingOptions(serviceId ?? "");
  const { data: cards } = usePaymentCards();
  const { pets } = useGetMyPets();
  const createBooking = useCreateBooking();

  useEffect(() => {
    if (!cards || cards.length === 0) return;

    const state = useBookingFlowStore.getState();
    if (!state.paymentCardId) {
      const primaryCard = cards.find((card) => card.isPrimary) ?? cards[0];
      state.selectPaymentCard(primaryCard.id);
    }
  }, [cards]);

  const pet = pets.find((item) => item.id === petId);
  const service = options?.services.find((item) => item.id === serviceId);
  const day = options?.days.find((item) => item.id === dayId);
  const isReady = Boolean(options && cards && pet && service && day && timeSlotId);

  const handleConfirm = () => {
    if (!options || !serviceId || !petId || !dayId || !timeSlotId || !paymentCardId) {
      toast.info("Vui lòng chọn phương thức thanh toán", {
        position: "bottom",
      });
      return;
    }

    createBooking.mutate(
      {
        providerId: options.providerId,
        serviceId,
        petId,
        petName: pet?.name ?? "",
        appointmentStart: timeSlotId,
      },
      {
        onSuccess: (booking) => {
          setConfirmedBooking(booking);
          nextStep();
        },
        onError: (error) => {
          toast.error(
            getApiErrorMessage(error, {
              fallback: "Đặt lịch thất bại, vui lòng thử lại",
              network: "Không có kết nối mạng, vui lòng thử lại",
            }),
            { position: "bottom" },
          );
        },
      },
    );
  };

  return (
    <>
      {!isReady ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={Colors.light.tint} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-7 px-5 pb-10 pt-5"
        >
          <BookingSummaryCard
            pet={pet!}
            service={service!}
            providerName={options!.providerName}
            scheduleLabel={`${day!.fullLabel}, ${formatAppointmentTime(timeSlotId!)}`}
          />

          <View className="gap-4">
            <Text className="font-mbold text-[17px] text-foreground">
              Phương thức thanh toán
            </Text>
            <PaymentCardPicker
              cards={cards!}
              selectedCardId={paymentCardId}
              onSelect={selectPaymentCard}
              onAddCard={() => router.push("/pet-owner/add-payment-method")}
            />
          </View>
        </ScrollView>
      )}

      <BookingBottomBar
        totalLabel={service ? formatCurrency(service.price) : "—"}
        ctaLabel="Xác nhận thanh toán"
        onPress={handleConfirm}
        disabled={!isReady || !paymentCardId}
        loading={createBooking.isPending}
      />
    </>
  );
}
