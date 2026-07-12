import { unwrapData } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { providerService } from "../../provider-list/services/provider.service";
import type { GlobalSearchResponse } from "../../provider-list/types/provider.type";

export const useGlobalSearch = (q: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["global-search", q],
    queryFn: () => providerService.searchGlobal({ q, page: 1, pageSize: 10 }),
    select: (res) => unwrapData<GlobalSearchResponse>(res),
    enabled: q.length > 0,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
