import React from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

import { Colors } from "@/constants/theme";
import { CANCEL_REASON_OPTIONS } from "@/features/pet-owner/bookings/constants/cancel-reasons";
import { useCancelBookingForm } from "@/features/pet-owner/bookings/hooks/useCancelBookingForm";
import { BottomSheet, ReasonOptionList } from "@/features/pet-owner/shared/components";

type CancelBookingSheetProps = {
  visible: boolean;
  bookingId: string;
  serviceName: string;
  petName: string;
  onClose: () => void;
  onSuccess: () => void;
};

export function CancelBookingSheet({
  visible,
  bookingId,
  serviceName,
  petName,
  onClose,
  onSuccess,
}: CancelBookingSheetProps) {
  const {
    reason,
    setReason,
    otherReason,
    setOtherReason,
    isOtherReason,
    errors,
    errorMessage,
    submitting,
    submit,
    reset,
  } = useCancelBookingForm({ bookingId, onSuccess });

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  return (
    <BottomSheet
      visible={visible}
      title="Hủy lịch hẹn"
      subtitle={`${serviceName} · ${petName}`}
      closeDisabled={submitting}
      onClose={handleClose}
    >
      <Text className="mb-3 ml-1 font-mbold text-[14px] leading-5 text-foreground">
        Vui lòng cho biết lý do hủy lịch
      </Text>

      <ReasonOptionList
        options={CANCEL_REASON_OPTIONS}
        value={reason}
        onChange={setReason}
        disabled={submitting}
      />

      {errors.reason ? (
        <Text className="ml-1 mt-2 font-default text-[12px] leading-4 text-destructive">
          {errors.reason}
        </Text>
      ) : null}

      {isOtherReason ? (
        <View className="mt-4 gap-2">
          <TextInput
            value={otherReason}
            onChangeText={setOtherReason}
            editable={!submitting}
            multiline
            maxLength={300}
            textAlignVertical="top"
            placeholder="Nhập lý do hủy lịch của bạn..."
            placeholderTextColor={Colors.light.icon}
            autoCorrect={false}
            spellCheck={false}
            autoComplete="off"
            textContentType="none"
            keyboardType="default"
            importantForAutofill="no"
            className="min-h-[96px] rounded-xl border border-border bg-card px-4 py-3 font-default text-[15px] text-card-foreground"
          />
          {errors.otherReason ? (
            <Text className="ml-1 font-default text-[12px] leading-4 text-destructive">
              {errors.otherReason}
            </Text>
          ) : null}
        </View>
      ) : null}

      {errorMessage ? (
        <Text className="mt-4 px-1 font-default text-[13px] leading-5 text-destructive">
          {errorMessage}
        </Text>
      ) : null}

      <Pressable
        onPress={submit}
        disabled={submitting}
        accessibilityRole="button"
        accessibilityLabel="Xác nhận hủy lịch"
        style={({ pressed }) => ({
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
        className="mt-6 w-full items-center justify-center rounded-full bg-destructive py-4 shadow-sm"
      >
        {submitting ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="font-mbold text-[15px] leading-5 text-white">
            Xác nhận hủy lịch
          </Text>
        )}
      </Pressable>

      <Pressable
        onPress={handleClose}
        disabled={submitting}
        accessibilityRole="button"
        accessibilityLabel="Giữ lịch hẹn"
        className="mt-3 w-full items-center justify-center rounded-full py-3 active:opacity-70"
      >
        <Text className="font-mbold text-[15px] leading-5 text-muted-foreground">
          Giữ lịch hẹn
        </Text>
      </Pressable>
    </BottomSheet>
  );
}
