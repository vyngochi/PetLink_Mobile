import api from "@/api/client";
import type { Coords } from "@/features/pet-owner/shared/hooks/useCurrentCoords";

export interface GetProviderReviewsParams {
  page?: number;
  pageSize?: number;
}

export const providerDetailService = {
  getProviderDetail: (providerId: string, coords?: Coords) => {
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
