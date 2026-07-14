import { useState } from "react";

import { useFieldErrors } from "@/features/authentication/shared/hooks/useFieldErrors";
import {
  getCancelReasonLabel,
  OTHER_CANCEL_REASON,
} from "@/features/pet-owner/bookings/constants/cancel-reasons";
import { useCancelBooking } from "@/features/pet-owner/bookings/hooks/useCancelBooking";
import {
  bookingCancelSchema,
  type BookingCancelFormValues,
} from "@/features/pet-owner/bookings/utils/booking-cancel.schema";
import { getApiErrorMessage } from "@/lib/http";
import { validate } from "@/lib/validation";

const CANCEL_ERROR_MESSAGES = {
  fallback: "Không thể hủy lịch hẹn, vui lòng thử lại.",
  network: "Không có kết nối mạng, vui lòng thử lại.",
  byMessage: {
    "Only PENDING or CONFIRMED bookings can be cancelled":
      "Lịch hẹn này không còn ở trạng thái có thể hủy.",
    "Booking not found": "Không tìm thấy lịch hẹn.",
  },
};

type UseCancelBookingFormOptions = {
  bookingId: string;
  onSuccess?: () => void;
};

export function useCancelBookingForm({
  bookingId,
  onSuccess,
}: UseCancelBookingFormOptions) {
  const [reason, setReasonValue] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const {
    errors,
    setErrors,
    errorMessage,
    setErrorMessage,
    clearFieldError,
    bindField,
    resetErrors,
  } = useFieldErrors<BookingCancelFormValues>();

  const cancelBooking = useCancelBooking();

  const setReason = (value: string) => {
    setReasonValue(value);
    clearFieldError("reason");
    clearFieldError("otherReason");
  };

  const reset = () => {
    setReasonValue("");
    setOtherReason("");
    resetErrors();
  };

  const submit = () => {
    if (cancelBooking.isPending) return;

    const result = validate(bookingCancelSchema, { reason, otherReason });
    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    resetErrors();
    cancelBooking.mutate(
      {
        bookingId,
        reason:
          result.data.reason === OTHER_CANCEL_REASON
            ? (result.data.otherReason ?? "")
            : getCancelReasonLabel(result.data.reason),
      },
      {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
        onError: (error) => {
          setErrorMessage(getApiErrorMessage(error, CANCEL_ERROR_MESSAGES));
        },
      },
    );
  };

  return {
    reason,
    setReason,
    otherReason,
    setOtherReason: bindField("otherReason", setOtherReason),
    isOtherReason: reason === OTHER_CANCEL_REASON,
    errors,
    errorMessage,
    submitting: cancelBooking.isPending,
    submit,
    reset,
  };
}
