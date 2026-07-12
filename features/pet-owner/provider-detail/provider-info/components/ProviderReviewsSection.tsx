import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { MOCK_REVIEWS } from "../constants/review-mock";
import { ReviewCard } from "./ReviewCard";
import { ReviewFilter } from "./ReviewFilter";

interface ProviderReviewsSectionProps {
  providerId: string;
}

const FILTERS = [
  "Tất cả",
  "Mới nhất",
  "Cao nhất",
  "Thấp nhất",
  "Tắm thú cưng",
  "Cắt tỉa móng",
];

export function ProviderReviewsSection({
  providerId,
}: ProviderReviewsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  //call api
  const providerReviews = useMemo(() => {
    return MOCK_REVIEWS.filter((r) => r.providerId === providerId);
  }, [providerId]);

  const filteredReviews = useMemo(() => {
    let result = [...providerReviews];

    switch (activeFilter) {
      case "Mới nhất":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "Cao nhất":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "Thấp nhất":
        result.sort((a, b) => a.rating - b.rating);
        break;
      case "Tất cả":
        break;
      default:
        // Filter by service name if it matches the filter roughly
        result = result.filter((r) =>
          r.serviceName.toLowerCase().includes(activeFilter.toLowerCase()),
        );
        break;
    }

    return result;
  }, [providerReviews, activeFilter]);

  return (
    <View className="py-4 mt-2 bg-background">
      <View className="flex-row items-center justify-between px-5 mb-2">
        <Text className="text-xl font-mbold text-foreground">Đánh giá</Text>
        <Text className="text-sm text-muted-foreground font-default">
          {providerReviews.length} lượt đánh giá
        </Text>
      </View>

      <ReviewFilter
        filters={FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <View className="mt-2">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <View className="items-center justify-center py-10">
            <Text className="text-sm text-muted-foreground font-default">
              Chưa có đánh giá nào phù hợp.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
