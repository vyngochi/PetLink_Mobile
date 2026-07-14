import { X, Plus } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { Colors } from "@/constants/theme";
import { DISPUTE_REASON_OPTIONS } from "@/features/pet-owner/booking-detail/constants/dispute-reasons";
import { useBookingDisputeForm } from "@/features/pet-owner/booking-detail/hooks/useBookingDisputeForm";
import { BottomSheet, ReasonOptionList } from "@/features/pet-owner/shared/components";

type BookingDisputeSheetProps = {
  visible: boolean;
  bookingId: string;
  serviceName: string;
  providerName: string;
  onClose: () => void;
  onSuccess: () => void;
};

export function BookingDisputeSheet({
  visible,
  bookingId,
  serviceName,
  providerName,
  onClose,
  onSuccess,
}: BookingDisputeSheetProps) {
  const {
    reason,
    setReason,
    otherReason,
    setOtherReason,
    description,
    setDescription,
    isOtherReason,
    photos,
    addPhotos,
    removePhoto,
    canAddPhoto,
    errors,
    errorMessage,
    submitting,
    submit,
    reset,
  } = useBookingDisputeForm({ bookingId, onSuccess });

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  return (
    <BottomSheet
      visible={visible}
      title="Khiếu nại dịch vụ"
      subtitle={`${serviceName} · ${providerName}`}
      closeDisabled={submitting}
      onClose={handleClose}
    >
      <Text className="mb-3 ml-1 font-mbold text-[14px] leading-5 text-foreground">
        Bạn gặp vấn đề gì với dịch vụ này?
      </Text>

      <ReasonOptionList
        options={DISPUTE_REASON_OPTIONS}
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
            maxLength={200}
            placeholder="Nhập lý do khiếu nại..."
            placeholderTextColor={Colors.light.icon}
            autoCorrect={false}
            spellCheck={false}
            autoComplete="off"
            textContentType="none"
            keyboardType="default"
            importantForAutofill="no"
            className="rounded-xl border border-border bg-card px-4 py-3 font-default text-[15px] text-card-foreground"
          />
          {errors.otherReason ? (
            <Text className="ml-1 font-default text-[12px] leading-4 text-destructive">
              {errors.otherReason}
            </Text>
          ) : null}
        </View>
      ) : null}

      <View className="mt-5 gap-2">
        <Text className="ml-1 font-mbold text-[14px] leading-5 text-foreground">
          Mô tả chi tiết
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          editable={!submitting}
          multiline
          maxLength={1000}
          textAlignVertical="top"
          placeholder="Mô tả sự việc để chúng tôi hỗ trợ bạn nhanh nhất..."
          placeholderTextColor={Colors.light.icon}
          autoCorrect={false}
          spellCheck={false}
          autoComplete="off"
          textContentType="none"
          keyboardType="default"
          importantForAutofill="no"
          className="min-h-[120px] rounded-xl border border-border bg-card px-4 py-3 font-default text-[15px] text-card-foreground"
        />
        {errors.description ? (
          <Text className="ml-1 font-default text-[12px] leading-4 text-destructive">
            {errors.description}
          </Text>
        ) : null}
      </View>

      <View className="mt-5 gap-2">
        <View className="flex-row items-center justify-between">
          <Text className="ml-1 font-mbold text-[14px] leading-5 text-foreground">
            Hình ảnh minh chứng ({photos.length}/10)
          </Text>
          {canAddPhoto && (
            <Pressable
              onPress={addPhotos}
              disabled={submitting}
              className="flex-row items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5"
            >
              <Plus size={16} color={Colors.light.tint} />
              <Text className="font-msemibold text-[13px] text-primary">
                Thêm ảnh
              </Text>
            </Pressable>
          )}
        </View>

        {photos.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingHorizontal: 4, paddingVertical: 4 }}
          >
            {photos.map((uri) => (
              <View key={uri} className="relative">
                <Image
                  source={{ uri }}
                  className="h-24 w-24 rounded-xl"
                  resizeMode="cover"
                />
                <Pressable
                  onPress={() => removePhoto(uri)}
                  disabled={submitting}
                  className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 shadow-sm"
                >
                  <X size={14} color="#fff" />
                </Pressable>
              </View>
            ))}
          </ScrollView>
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
        accessibilityLabel="Gửi khiếu nại"
        style={({ pressed }) => ({
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
        className="mt-6 w-full items-center justify-center rounded-full bg-primary py-4 shadow-sm"
      >
        {submitting ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="font-mbold text-[15px] leading-5 text-white">
            Gửi khiếu nại
          </Text>
        )}
      </Pressable>
    </BottomSheet>
  );
}
