import type {
  GetProvidersParams,
  ProviderListResponse,
} from "@/features/pet-owner/shared/types/provider.type";
import { unwrapData } from "@/lib/http";
import { useInfiniteQuery } from "@tanstack/react-query";
import { providerKeys } from "../constants/query-keys";
import { providerService } from "../services/provider.service";

const PAGE_SIZE = 10;

export const useGetProviders = (params: GetProvidersParams = {}) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: providerKeys.list(params),
    queryFn: async ({ pageParam }) => {
      const res = await providerService.getProviders({
        ...params,
        page: pageParam,
        pageSize: PAGE_SIZE,
      });
      return unwrapData<ProviderListResponse>(res);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.pagination.hasNextPage ? allPages.length + 1 : undefined,
  });

  const pages = data?.pages ?? [];

  return {
    providers: pages.flatMap((page) => page.items),
    total: pages[0]?.pagination.totalItems ?? 0,
    hasNextPage: hasNextPage ?? false,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
};
