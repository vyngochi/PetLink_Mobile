import { Star } from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";
import { ProviderReview } from "../types/review.type";

interface ReviewCardProps {
  review: ProviderReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View className="px-5 py-4 border-b border-border/30">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-3">
          <View className="items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-muted">
            {review.userAvatar ? (
              <Image
                source={{ uri: review.userAvatar }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-lg text-muted-foreground font-mbold">
                {review.userName.charAt(0)}
              </Text>
            )}
          </View>
          <View>
            <Text className="text-base text-foreground font-mbold">
              {review.userName}
            </Text>
            <Text className="text-xs text-muted-foreground font-default">
              {formatDate(review.createdAt)}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-1 px-2 py-1 bg-[#df852a]/10 rounded-lg">
          <Star size={12} className="text-[#df852a]" fill="#df852a" />
          <Text className="text-sm font-mbold text-[#df852a]">
            {review.rating}
          </Text>
        </View>
      </View>

      <Text className="mb-3 text-sm leading-5 text-foreground font-default">
        {review.comment}
      </Text>

      <View className="flex-row">
        <View className="px-3 py-1.5 rounded-lg bg-surface-container-highest">
          <Text className="text-xs text-muted-foreground font-mbold">
            {review.serviceName}
          </Text>
        </View>
      </View>
    </View>
  );
}
