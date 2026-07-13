import { X } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { StarRatingInput } from "@/features/pet-owner/booking-detail/components/StarRatingInput";
import { useBookingReviewForm } from "@/features/pet-owner/booking-detail/hooks/useBookingReviewForm";

type BookingReviewModalProps = {
  visible: boolean;
  bookingId: string;
  providerId: string;
  serviceName: string;
  onClose: () => void;
  onSuccess: () => void;
};

export function BookingReviewModal({
  visible,
  bookingId,
  providerId,
  serviceName,
  onClose,
  onSuccess,
}: BookingReviewModalProps) {
  const {
    rating,
    setRating,
    comment,
    setComment,
    errors,
    errorMessage,
    submitting,
    submit,
    reset,
  } = useBookingReviewForm({ bookingId, providerId, onSuccess });

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="rounded-t-3xl bg-background px-5 pb-8 pt-6">
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="font-mbold text-xl text-foreground">
                Đánh giá dịch vụ
              </Text>
              <Pressable
                onPress={handleClose}
                disabled={submitting}
                accessibilityRole="button"
                accessibilityLabel="Đóng"
                className="h-9 w-9 items-center justify-center rounded-full bg-muted active:opacity-70"
              >
                <X size={18} className="text-foreground" />
              </Pressable>
            </View>

            <Text
              className="font-default text-[14px] leading-5 text-muted-foreground"
              numberOfLines={1}
            >
              {serviceName}
            </Text>

            <View className="mt-6 gap-2">
              <StarRatingInput
                value={rating}
                onChange={setRating}
                disabled={submitting}
              />
              {errors.rating ? (
                <Text className="text-center font-default text-[12px] leading-4 text-destructive">
                  {errors.rating}
                </Text>
              ) : null}
            </View>

            <View className="mt-6 gap-2">
              <Text className="ml-1 font-mbold text-[14px] leading-5 text-foreground">
                Nhận xét
              </Text>
              <TextInput
                value={comment}
                onChangeText={setComment}
                editable={!submitting}
                multiline
                maxLength={1000}
                textAlignVertical="top"
                placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ..."
                placeholderTextColor={Colors.light.icon}
                autoCorrect={false}
                spellCheck={false}
                autoComplete="off"
                textContentType="none"
                keyboardType="default"
                importantForAutofill="no"
                className="min-h-[120px] rounded-xl border border-border bg-card px-4 py-3 font-default text-[15px] text-card-foreground"
              />
              {errors.comment ? (
                <Text className="ml-1 font-default text-[12px] leading-4 text-destructive">
                  {errors.comment}
                </Text>
              ) : null}
            </View>

            {errorMessage ? (
              <Text className="mt-4 px-1 font-default text-[13px] leading-5 text-destructive">
                {errorMessage}
              </Text>
            ) : null}

            <Pressable
              onPress={submit}
              disabled={submitting}
              accessibilityRole="button"
              accessibilityLabel="Gửi đánh giá"
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
              className="mt-6 w-full items-center justify-center rounded-full bg-primary py-4 shadow-sm"
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text className="font-mbold text-[15px] leading-5 text-white">
                  Gửi đánh giá
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
