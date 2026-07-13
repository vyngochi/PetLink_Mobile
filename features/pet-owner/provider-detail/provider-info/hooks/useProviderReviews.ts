import { unwrapData } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { providerDetailKeys } from "../../shared/constants/query-keys";
import { providerDetailService } from "../../shared/services/provider-detail.service";
import type {
  ApiProviderReview,
  ProviderReview,
  ProviderReviewsResponse,
} from "../types/review.type";

const REVIEWS_PAGE_SIZE = 50;

const ANONYMOUS_REVIEWER = "Người dùng";

const EMPTY_REVIEWS: ProviderReviewsResponse = {
  responseReviews: [],
  page: 1,
  pageSize: REVIEWS_PAGE_SIZE,
  total: 0,
};

const toReviewerAvatar = (avatarUrl: string | null) =>
  avatarUrl?.startsWith("http") ? avatarUrl : undefined;

const toProviderReview = (review: ApiProviderReview): ProviderReview => ({
  id: review.id,
  userId: review.user.id,
  userName: review.user.name?.trim() || ANONYMOUS_REVIEWER,
  userAvatar: toReviewerAvatar(review.user.avatarUrl),
  rating: review.rating,
  comment: review.comment ?? "",
  images: review.images,
  createdAt: review.createdAt,
});

export const useProviderReviews = (providerId: string) => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: providerDetailKeys.reviews(providerId),
    queryFn: async () => {
      try {
        const response = await providerDetailService.getProviderReviews(
          providerId,
          { pageSize: REVIEWS_PAGE_SIZE },
        );
        return unwrapData<ProviderReviewsResponse>(response);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return EMPTY_REVIEWS;
        }
        throw error;
      }
    },
    select: (result) => ({
      reviews: result.responseReviews.map(toProviderReview),
      total: result.total,
    }),
    enabled: Boolean(providerId),
  });

  return {
    reviews: data?.reviews ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
};
