import { useState } from "react";

import { useFieldErrors } from "@/features/authentication/shared/hooks/useFieldErrors";
import { useCreateBookingReview } from "@/features/pet-owner/booking-detail/hooks/useCreateBookingReview";
import {
  bookingReviewSchema,
  type BookingReviewFormValues,
} from "@/features/pet-owner/booking-detail/utils/booking-review.schema";
import { getApiErrorMessage } from "@/lib/http";
import { validate } from "@/lib/validation";

const REVIEW_ERROR_MESSAGES = {
  fallback: "Không thể gửi đánh giá, vui lòng thử lại.",
  network: "Không có kết nối mạng, vui lòng thử lại.",
  byMessage: {
    "This booking has already been reviewed": "Lịch hẹn này đã được đánh giá.",
    "Only COMPLETED bookings can be reviewed":
      "Chỉ có thể đánh giá lịch hẹn đã hoàn thành.",
  },
};

type UseBookingReviewFormOptions = {
  bookingId: string;
  providerId: string;
  onSuccess?: () => void;
};

export function useBookingReviewForm({
  bookingId,
  providerId,
  onSuccess,
}: UseBookingReviewFormOptions) {
  const [rating, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const {
    errors,
    setErrors,
    errorMessage,
    setErrorMessage,
    clearFieldError,
    bindField,
    resetErrors,
  } = useFieldErrors<BookingReviewFormValues>();

  const createReview = useCreateBookingReview();

  const setRating = (value: number) => {
    setRatingValue(value);
    clearFieldError("rating");
  };

  const reset = () => {
    setRatingValue(0);
    setComment("");
    resetErrors();
  };

  const submit = () => {
    if (createReview.isPending) return;
    const result = validate(bookingReviewSchema, { rating, comment });
    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    resetErrors();
    createReview.mutate(
      {
        bookingId,
        providerId,
        payload: {
          rating: result.data.rating,
          comment: result.data.comment || undefined,
        },
      },
      {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
        onError: (error) => {
          setErrorMessage(getApiErrorMessage(error, REVIEW_ERROR_MESSAGES));
        },
      },
    );
  };

  return {
    rating,
    setRating,
    comment,
    setComment: bindField("comment", setComment),
    errors,
    errorMessage,
    submitting: createReview.isPending,
    submit,
    reset,
  };
}
