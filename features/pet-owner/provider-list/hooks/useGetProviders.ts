import { unwrapData } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { providerKeys } from "../constants/query-keys";
import { providerService } from "../services/provider.service";
import type {
  GetProvidersParams,
  ProviderListResponse,
} from "../types/provider.type";

export const useGetProviders = (params: GetProvidersParams = {}) => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: providerKeys.list(params),
    queryFn: () => providerService.getProviders(params),
    select: (res) => unwrapData<ProviderListResponse>(res),
  });

  return {
    providers: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
};
