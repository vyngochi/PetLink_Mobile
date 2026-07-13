import { Star } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

import type { ApiBookingReview } from "@/features/pet-owner/shared/types/booking.type";

const STAR_COLOR = "#df852a";

type BookingReviewSummaryProps = {
  review: ApiBookingReview;
};

const formatReviewDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export function BookingReviewSummary({ review }: BookingReviewSummaryProps) {
  return (
    <View className="rounded-[20px] border border-border bg-card p-5 shadow-sm">
      <View className="flex-row items-center justify-between">
        <Text className="font-mbold text-[15px] leading-6 text-foreground">
          Đánh giá của bạn
        </Text>
        <Text className="font-default text-[12px] leading-4 text-muted-foreground">
          {formatReviewDate(review.createAt)}
        </Text>
      </View>

      <View className="mt-3 flex-row items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            color={star <= review.rating ? STAR_COLOR : "#d1d5db"}
            fill={star <= review.rating ? STAR_COLOR : "transparent"}
          />
        ))}
      </View>

      {review.comment ? (
        <Text className="mt-3 font-default text-[14px] leading-5 text-foreground">
          {review.comment}
        </Text>
      ) : null}
    </View>
  );
}
