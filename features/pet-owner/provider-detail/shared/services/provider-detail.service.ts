import api from "@/api/client";
import type { ApiCoords } from "@/features/pet-owner/shared/utils/coordinates";

export interface GetProviderReviewsParams {
  page?: number;
  pageSize?: number;
}

export const providerDetailService = {
  getProviderDetail: (providerId: string, coords?: ApiCoords) => {
    return api.get(`/mobile/providers/provider-detail/${providerId}`, {
      params: coords,
    });
  },
  getProviderReviews: (
    providerId: string,
    params: GetProviderReviewsParams = {},
  ) => {
    return api.get(`/mobile/providers/reviews/${providerId}`, { params });
  },
};
