import type {
  GetProvidersParams,
  ProviderListResponse,
} from "@/features/pet-owner/shared/types/provider.type";
import { unwrapData } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { providerKeys } from "../constants/query-keys";
import { providerService } from "../services/provider.service";

export const useGetProviders = (params: GetProvidersParams = {}) => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: providerKeys.list(params),
    queryFn: () => providerService.getProviders(params),
    select: (res) => unwrapData<ProviderListResponse>(res),
  });

  return {
    providers: data?.items ?? [],
    total: data?.pagination.totalItems ?? 0,
    hasNextPage: data?.pagination.hasNextPage ?? false,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
};
