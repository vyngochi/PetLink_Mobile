import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { toast } from "@/components/toast";
import { Colors } from "@/constants/theme";
import {
  BookingSummaryCard,
  PaymentCardPicker,
} from "@/features/pet-owner/booking-flow/review/components";
import {
  BookingBottomBar,
  BookingStepHeader,
} from "@/features/pet-owner/booking-flow/shared/components";
import { useBookingOptions } from "@/features/pet-owner/booking-flow/shared/hooks/useBookingOptions";
import { useCreateBooking } from "@/features/pet-owner/booking-flow/shared/hooks/useCreateBooking";
import { usePaymentCards } from "@/features/pet-owner/booking-flow/shared/hooks/usePaymentCards";
import { useBookingFlowStore } from "@/features/pet-owner/booking-flow/shared/stores/booking-flow.store";
import { formatCurrency } from "@/features/pet-owner/booking-flow/shared/utils/currency";

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
  } = useBookingFlowStore();

  const { data: options } = useBookingOptions(serviceId ?? "");
  const { data: cards } = usePaymentCards();
  const createBooking = useCreateBooking();

  useEffect(() => {
    if (!cards || cards.length === 0) return;

    const state = useBookingFlowStore.getState();
    if (!state.paymentCardId) {
      const primaryCard = cards.find((card) => card.isPrimary) ?? cards[0];
      state.selectPaymentCard(primaryCard.id);
    }
  }, [cards]);

  if (!serviceId || !petId || !dayId || !timeSlotId) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg text-muted-foreground font-mbold">
          Phiên đặt lịch không hợp lệ
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="px-4 py-2 mt-4 rounded-full bg-primary"
        >
          <Text className="text-white font-mbold">Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  const pet = options?.pets.find((item) => item.id === petId);
  const service = options?.services.find((item) => item.id === serviceId);
  const day = options?.days.find((item) => item.id === dayId);
  const slot = options?.timeSlots.find((item) => item.id === timeSlotId);
  const isReady = Boolean(options && cards && pet && service && day && slot);

  const handleConfirm = () => {
    if (!paymentCardId) {
      toast.info("Vui lòng chọn phương thức thanh toán", {
        position: "bottom",
      });
      return;
    }

    createBooking.mutate(
      { serviceId, petId, dayId, timeSlotId, paymentCardId },
      {
        onSuccess: (booking) => {
          setConfirmedBooking(booking);
          router.replace("/pet-owner/booking/success");
        },
        onError: () => {
          toast.error("Đặt lịch thất bại, vui lòng thử lại", {
            position: "bottom",
          });
        },
      },
    );
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <BookingStepHeader title="Xác nhận đặt lịch" step={2} />

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
            scheduleLabel={`${day!.fullLabel}, ${slot!.label}`}
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
    </SafeAreaView>
  );
}
