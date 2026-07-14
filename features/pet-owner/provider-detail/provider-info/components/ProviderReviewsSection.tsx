import { Colors } from "@/constants/theme";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useProviderReviews } from "../hooks/useProviderReviews";
import { ReviewCard } from "./ReviewCard";
import { ReviewFilter } from "./ReviewFilter";

interface ProviderReviewsSectionProps {
  providerId: string;
}

const FILTERS = ["Tất cả", "Mới nhất", "Cao nhất", "Thấp nhất"];

export function ProviderReviewsSection({
  providerId,
}: ProviderReviewsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const { reviews, total, isLoading, isError, refetch } =
    useProviderReviews(providerId);

  const sortedReviews = useMemo(() => {
    const result = [...reviews];

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
      default:
        break;
    }

    return result;
  }, [reviews, activeFilter]);

  return (
    <View className="py-4 mt-2 bg-background">
      <View className="flex-row items-center justify-between px-5 mb-2">
        <Text className="text-xl font-mbold text-foreground">Đánh giá</Text>
        <Text className="text-sm text-muted-foreground font-default">
          {total} lượt đánh giá
        </Text>
      </View>

      <ReviewFilter
        filters={FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <View className="mt-2">
        {isLoading ? (
          <View className="items-center justify-center py-10">
            <ActivityIndicator color={Colors.light.tint} />
          </View>
        ) : isError ? (
          <View className="items-center justify-center gap-3 py-10">
            <Text className="text-sm text-muted-foreground font-default">
              Không thể tải đánh giá.
            </Text>
            <Pressable
              onPress={() => refetch()}
              className="px-6 py-2 rounded-full bg-primary active:opacity-90"
            >
              <Text className="text-white font-mbold">Thử lại</Text>
            </Pressable>
          </View>
        ) : sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <View className="items-center justify-center py-10">
            <Text className="text-sm text-muted-foreground font-default">
              Chưa có đánh giá nào.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
