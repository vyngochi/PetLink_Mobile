import { useCurrentCoords } from "@/features/pet-owner/shared/hooks/useCurrentCoords";
import type { ProviderItem } from "@/features/pet-owner/shared/types/provider.type";
import { unwrapData } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { providerDetailKeys } from "../constants/query-keys";
import { providerDetailService } from "../services/provider-detail.service";

const toProviderDetail = (provider: ProviderItem): ProviderItem => ({
  ...provider,
  rating: {
    ...provider.rating,
    average: Math.round(provider.rating.average * 10) / 10,
  },
});

export const useProviderDetail = (providerId: string) => {
  const coords = useCurrentCoords();

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: providerDetailKeys.detail(providerId, coords),
    queryFn: async () => {
      const response = await providerDetailService.getProviderDetail(
        providerId,
        coords,
      );
      return unwrapData<ProviderItem>(response);
    },
    select: toProviderDetail,
    enabled: Boolean(providerId),
  });

  const isNotFound =
    axios.isAxiosError(error) && error.response?.status === 404;

  return {
    provider: data,
    isLoading,
    isError,
    isNotFound,
    error,
    refetch,
    isRefetching,
  };
};
