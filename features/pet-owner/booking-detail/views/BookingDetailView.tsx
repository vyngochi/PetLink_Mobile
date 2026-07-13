import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { toast } from "@/components/toast";
import { Colors } from "@/constants/theme";
import {
  BookingAppointmentCard,
  BookingDetailActions,
  BookingDetailPetCard,
  BookingDetailTopBar,
  BookingReviewModal,
  BookingReviewSummary,
  CheckInPassCard,
} from "@/features/pet-owner/booking-detail/components";
import { useBookingDetail } from "@/features/pet-owner/booking-detail/hooks/useBookingDetail";
import { useBookingQr } from "@/features/pet-owner/booking-detail/hooks/useBookingQr";
import { BookingStatusBadge } from "@/features/pet-owner/bookings/components";
import { useCancelBooking } from "@/features/pet-owner/bookings/hooks/useCancelBooking";
import { getApiErrorMessage } from "@/lib/http";

type BookingDetailViewProps = {
  bookingId: string;
};

export function BookingDetailView({ bookingId }: BookingDetailViewProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isReviewVisible, setReviewVisible] = useState(false);
  const { detail, isLoading } = useBookingDetail(bookingId);
  const cancelBooking = useCancelBooking();
  const { qr, isLoading: isQrLoading } = useBookingQr(
    bookingId,
    detail?.qrAction ?? null,
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  if (!detail) {
    return (
      <View className="flex-1 items-center justify-center gap-4 bg-background px-5">
        <Text className="text-center font-mbold text-[18px] text-muted-foreground">
          Không tìm thấy lịch hẹn
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="rounded-full bg-primary px-6 py-3 active:opacity-90"
        >
          <Text className="font-mbold text-primary-foreground">Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  const qrAction = detail.qrAction;

  const handleCancel = () => {
    Alert.alert(
      "Hủy lịch hẹn",
      `Bạn có chắc muốn hủy lịch hẹn "${detail.serviceName}" cho ${detail.petName}?`,
      [
        { text: "Giữ lịch", style: "cancel" },
        {
          text: "Hủy lịch",
          style: "destructive",
          onPress: () => {
            cancelBooking.mutate(detail.id, {
              onSuccess: () => {
                toast.success("Đã hủy lịch hẹn", { position: "bottom" });
                router.back();
              },
              onError: (cancelError) => {
                toast.error(
                  getApiErrorMessage(cancelError, {
                    fallback: "Không thể hủy lịch hẹn, vui lòng thử lại",
                    network: "Không có kết nối mạng, vui lòng thử lại",
                  }),
                  { position: "bottom" },
                );
              },
            });
          },
        },
      ]
    );
  };

  const notifyComingSoon = () => {
    toast.info("Tính năng đang được phát triển", { position: "bottom" });
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <BookingDetailTopBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-6 px-5 pt-2"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        <View className="items-center gap-2">
          <BookingStatusBadge status={detail.status} />
          <Text className="font-default text-[12px] uppercase tracking-widest text-muted-foreground">
            Mã đặt lịch #{detail.reference}
          </Text>
        </View>

        <BookingDetailPetCard booking={detail} />

        <BookingAppointmentCard booking={detail} />

        {qrAction ? (
          <CheckInPassCard
            action={qrAction}
            qrToken={qr?.qrToken ?? null}
            isLoading={isQrLoading}
            reference={detail.reference}
          />
        ) : null}

        {detail.review ? <BookingReviewSummary review={detail.review} /> : null}

        <View className="gap-3">
          <BookingDetailActions
            status={detail.status}
            canReview={detail.status === "completed" && !detail.review}
            onReview={() => setReviewVisible(true)}
            onReschedule={notifyComingSoon}
            onCancel={handleCancel}
            onRebook={notifyComingSoon}
          />
        </View>
      </ScrollView>

      <BookingReviewModal
        visible={isReviewVisible}
        bookingId={detail.id}
        providerId={detail.providerId}
        serviceName={detail.serviceName}
        onClose={() => setReviewVisible(false)}
        onSuccess={() => {
          setReviewVisible(false);
          toast.success("Cảm ơn bạn đã đánh giá!", { position: "bottom" });
        }}
      />
    </SafeAreaView>
  );
}
