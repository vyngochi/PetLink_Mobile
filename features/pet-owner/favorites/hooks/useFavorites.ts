import { useState } from "react";

import { FAVORITES_MOCK } from "@/features/pet-owner/favorites/constants/favorites-mock";
import type {
  FavoriteProvider,
  FavoriteService,
} from "@/features/pet-owner/favorites/types";

export function useFavorites() {
  const [providers, setProviders] = useState<FavoriteProvider[]>(
    FAVORITES_MOCK.providers
  );
  const [services, setServices] = useState<FavoriteService[]>(
    FAVORITES_MOCK.services
  );

  const removeProvider = (id: string) => {
    setProviders((current) => current.filter((item) => item.id !== id));
  };

  const removeService = (id: string) => {
    setServices((current) => current.filter((item) => item.id !== id));
  };

  return { providers, services, removeProvider, removeService };
}
