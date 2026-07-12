import api from "@/api/client";
import type { GetProvidersParams } from "../types/provider.type";

export const providerService = {
  getProviders: (params: GetProvidersParams) => {
    return api.get("/mobile/providers", { params });
  },
  searchGlobal: (params: GetProvidersParams) => {
    return api.get("/mobile/search", { params });
  },
};
