import type { ApiCoords } from "@/features/pet-owner/shared/utils/coordinates";

export const providerDetailKeys = {
  all: ["provider-detail"] as const,
  details: () => [...providerDetailKeys.all, "detail"] as const,
  detail: (providerId: string, coords?: ApiCoords) =>
    [...providerDetailKeys.details(), providerId, coords ?? null] as const,
  reviewLists: () => [...providerDetailKeys.all, "reviews"] as const,
  reviews: (providerId: string) =>
    [...providerDetailKeys.reviewLists(), providerId] as const,
};

export const serviceKeys = {
  all: ["services"] as const,
  lists: () => [...serviceKeys.all, "list"] as const,
  list: (providerId: string) => [...serviceKeys.lists(), providerId] as const,
  details: () => [...serviceKeys.all, "detail"] as const,
  detail: (serviceId: string) => [...serviceKeys.details(), serviceId] as const,
};
