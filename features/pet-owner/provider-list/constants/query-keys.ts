import type { GetProvidersParams } from "@/features/pet-owner/shared/types/provider.type";

export const providerKeys = {
  all: ["providers"] as const,
  lists: () => [...providerKeys.all, "list"] as const,
  list: (params: GetProvidersParams) =>
    [...providerKeys.lists(), params] as const,
};
