import { unwrapData } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { serviceKeys } from "../../shared/constants/query-keys";
import { serviceService } from "../../shared/services/service.service";
import type { ServiceDetailItem } from "../types/service-detail.type";

const toServiceDetail = (service: ServiceDetailItem) =>
  service.id ? service : undefined;

export const useServiceDetail = (serviceId: string) => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: serviceKeys.detail(serviceId),
    queryFn: async () => {
      const response = await serviceService.getServiceDetail(serviceId);
      return unwrapData<ServiceDetailItem>(response);
    },
    select: toServiceDetail,
    enabled: Boolean(serviceId),
  });

  return {
    service: data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
};
