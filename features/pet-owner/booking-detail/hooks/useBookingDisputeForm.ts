import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import { toast } from "@/components/toast";
import { isLocalImageUri } from "@/features/pet-owner/shared/utils/image-form-data";
import {
  getDisputeReasonLabel,
  OTHER_DISPUTE_REASON,
} from "@/features/pet-owner/booking-detail/constants/dispute-reasons";
import { useCreateBookingDispute } from "@/features/pet-owner/booking-detail/hooks/useCreateBookingDispute";
import {
  bookingDisputeSchema,
  type BookingDisputeFormValues,
} from "@/features/pet-owner/booking-detail/utils/booking-dispute.schema";
import { useFieldErrors } from "@/features/authentication/shared/hooks/useFieldErrors";
import { getApiErrorMessage } from "@/lib/http";
import { validate } from "@/lib/validation";

const DISPUTE_ERROR_MESSAGES = {
  fallback: "Không thể gửi khiếu nại, vui lòng thử lại.",
  network: "Không có kết nối mạng, vui lòng thử lại.",
  byMessage: {
    "Only CHECKED_OUT bookings can be disputed":
      "Chỉ có thể khiếu nại lịch hẹn vừa hoàn tất dịch vụ.",
    "Dispute window has expired":
      "Đã hết thời hạn khiếu nại cho lịch hẹn này.",
    "This booking already has a dispute": "Lịch hẹn này đã có khiếu nại.",
    "Booking not found": "Không tìm thấy lịch hẹn.",
  },
};

type UseBookingDisputeFormOptions = {
  bookingId: string;
  onSuccess?: () => void;
};

export function useBookingDisputeForm({
  bookingId,
  onSuccess,
}: UseBookingDisputeFormOptions) {
  const [reason, setReasonValue] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const {
    errors,
    setErrors,
    errorMessage,
    setErrorMessage,
    clearFieldError,
    bindField,
    resetErrors,
  } = useFieldErrors<BookingDisputeFormValues>();

  const createDispute = useCreateBookingDispute();

  const setReason = (value: string) => {
    setReasonValue(value);
    clearFieldError("reason");
    clearFieldError("otherReason");
  };

  const reset = () => {
    setReasonValue("");
    setOtherReason("");
    setDescription("");
    setPhotos([]);
    resetErrors();
  };

  const MAX_NEW_PHOTOS = 10;
  const remainingPhotoSlots = MAX_NEW_PHOTOS - photos.filter(isLocalImageUri).length;

  const removePhoto = (photo: string) => {
    setPhotos((prev) => prev.filter((item) => item !== photo));
  };

  const addPhotos = async () => {
    if (remainingPhotoSlots <= 0) return;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      toast.error("Cần cấp quyền truy cập thư viện ảnh để chọn ảnh.", {
        position: "bottom",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
      selectionLimit: remainingPhotoSlots,
      quality: 0.8,
    });

    if (result.canceled) return;

    setPhotos((prev) => [...prev, ...result.assets.map((asset) => asset.uri)]);
  };

  const submit = () => {
    if (createDispute.isPending) return;

    const result = validate(bookingDisputeSchema, {
      reason,
      otherReason,
      description,
    });
    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    resetErrors();
    createDispute.mutate(
      {
        bookingId,
        payload: {
          reason:
            result.data.reason === OTHER_DISPUTE_REASON
              ? (result.data.otherReason ?? "")
              : getDisputeReasonLabel(result.data.reason),
          description: result.data.description,
          evidenceFiles: photos,
        },
      },
      {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
        onError: (error) => {
          setErrorMessage(getApiErrorMessage(error, DISPUTE_ERROR_MESSAGES));
        },
      },
    );
  };

  return {
    reason,
    setReason,
    otherReason,
    setOtherReason: bindField("otherReason", setOtherReason),
    description,
    setDescription: bindField("description", setDescription),
    isOtherReason: reason === OTHER_DISPUTE_REASON,
    photos,
    addPhotos,
    removePhoto,
    canAddPhoto: remainingPhotoSlots > 0,
    errors,
    errorMessage,
    submitting: createDispute.isPending,
    submit,
    reset,
  };
}
