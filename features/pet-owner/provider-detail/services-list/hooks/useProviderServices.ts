import type { ProviderServicePreview } from "@/features/pet-owner/shared/types/provider.type";
import { unwrapData } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { serviceKeys } from "../../shared/constants/query-keys";
import { serviceService } from "../../shared/services/service.service";
import type {
  ApiProviderService,
  ProviderServicesResponse,
} from "../types/service.type";

const SERVICES_PAGE_SIZE = 100;

const isVisibleToCustomer = (service: ApiProviderService) =>
  service.isActive && !service.isHiddenByAdmin;

const toServicePreview = (
  service: ApiProviderService,
): ProviderServicePreview => ({
  id: service.id,
  name: service.name,
  price: service.price,
  durationMinutes: service.duration,
  thumbnailUrl: service.imageUrls[0] ?? "",
  description: service.description ?? undefined,
});

export const useProviderServices = (providerId: string) => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: serviceKeys.list(providerId),
    queryFn: async () => {
      const response = await serviceService.getServicesByProvider(providerId, {
        pageSize: SERVICES_PAGE_SIZE,
      });
      return unwrapData<ProviderServicesResponse>(response);
    },
    select: (result) =>
      result.data.filter(isVisibleToCustomer).map(toServicePreview),
    enabled: Boolean(providerId),
  });

  return {
    services: data ?? [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
};
