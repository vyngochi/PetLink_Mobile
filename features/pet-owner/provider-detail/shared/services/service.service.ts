import api from "@/api/client";

export interface GetProviderServicesParams {
  page?: number;
  pageSize?: number;
}

export const serviceService = {
  getServicesByProvider: (
    providerId: string,
    params: GetProviderServicesParams = {},
  ) => {
    return api.get(`/mobile/services/${providerId}`, { params });
  },
  getServiceDetail: (serviceId: string) => {
    return api.get(`/mobile/services/service-detail/${serviceId}`);
  },
};
