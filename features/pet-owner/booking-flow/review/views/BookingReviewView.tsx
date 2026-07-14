import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
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
import { useBookingFlowStore } from "@/features/pet-owner/booking-flow/shared/stores/booking-flow.store";
import { formatCurrency } from "@/features/pet-owner/booking-flow/shared/utils/currency";
import { useGetMyPets } from "@/features/pet-owner/my-pets/hooks/useGetMyPets";
import { usePaymentMethods } from "@/features/pet-owner/payment-methods/hooks/usePaymentMethods";
import { bookingKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { bookingService } from "@/features/pet-owner/shared/services/booking.service";
import { formatAppointmentTime } from "@/features/pet-owner/shared/utils/booking-format";
import { getApiErrorMessage } from "@/lib/http";

export function BookingReviewView() {
  const router = useRouter();
  const queryClient = useQueryClient();
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
  const { methods, isLoading: isMethodsLoading } = usePaymentMethods();
  const enabledMethods = methods.filter((m) => m.isEnabled);
  const { pets } = useGetMyPets();
  const createBooking = useCreateBooking();
  const [isProcessingMomo, setIsProcessingMomo] = useState(false);

  useEffect(() => {
    if (isMethodsLoading || enabledMethods.length === 0) return;

    const state = useBookingFlowStore.getState();
    if (!state.paymentCardId || !enabledMethods.find(m => m.id === state.paymentCardId)) {
      state.selectPaymentCard(enabledMethods[0].id);
    }
  }, [enabledMethods, isMethodsLoading]);

  const pet = pets.find((item) => item.id === petId);
  const service = options?.services.find((item) => item.id === serviceId);
  const day = options?.days.find((item) => item.id === dayId);
  const isReady = Boolean(
    options && !isMethodsLoading && pet && service && day && timeSlotId,
  );

  const handleConfirm = () => {
    if (
      !options ||
      !serviceId ||
      !petId ||
      !dayId ||
      !timeSlotId ||
      !paymentCardId
    ) {
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
        paymentMethod: paymentCardId === "momo" ? "ONLINE" : "CASH",
      },
      {
        onSuccess: async (booking) => {
          if (paymentCardId === "momo") {
            setIsProcessingMomo(true);
            try {
              const res = await bookingService.createMomoPayment(booking.id);
              const payUrl = res.data?.data?.payUrl;
              if (payUrl) {
                await WebBrowser.openBrowserAsync(payUrl);
                queryClient.invalidateQueries({
                  queryKey: bookingKeys.myBookings(),
                });
                setConfirmedBooking(booking);
                nextStep();
              } else {
                toast.error("Không thể tạo thanh toán MoMo", {
                  position: "bottom",
                });
              }
            } catch (error) {
              toast.error("Lỗi khi kết nối MoMo", { position: "bottom" });
            } finally {
              setIsProcessingMomo(false);
            }
          } else {
            setConfirmedBooking(booking);
            nextStep();
          }
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
            {enabledMethods.length > 0 ? (
              <PaymentCardPicker
                methods={enabledMethods}
                selectedMethodId={paymentCardId}
                onSelect={selectPaymentCard}
              />
            ) : (
              <Text className="text-[14px] text-muted-foreground">
                Chưa có phương thức thanh toán nào được bật. Hãy vào phần Cài đặt phương thức thanh toán.
              </Text>
            )}
          </View>
        </ScrollView>
      )}

      <BookingBottomBar
        totalLabel={service ? formatCurrency(service.price) : "—"}
        ctaLabel="Xác nhận thanh toán"
        onPress={handleConfirm}
        disabled={!isReady || !paymentCardId || isProcessingMomo}
        loading={createBooking.isPending || isProcessingMomo}
      />
    </>
  );
}
