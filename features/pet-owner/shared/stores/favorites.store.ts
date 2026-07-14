import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type {
  FavoriteProvider,
  FavoriteService,
} from "@/features/pet-owner/shared/types/favorite.type";

interface FavoritesState {
  providers: FavoriteProvider[];
  services: FavoriteService[];
  toggleProvider: (provider: FavoriteProvider) => void;
  toggleService: (service: FavoriteService) => void;
  removeProvider: (id: string) => void;
  removeService: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      providers: [],
      services: [],
      toggleProvider: (provider) =>
        set((state) => ({
          providers: state.providers.some((item) => item.id === provider.id)
            ? state.providers.filter((item) => item.id !== provider.id)
            : [provider, ...state.providers],
        })),
      toggleService: (service) =>
        set((state) => ({
          services: state.services.some((item) => item.id === service.id)
            ? state.services.filter((item) => item.id !== service.id)
            : [service, ...state.services],
        })),
      removeProvider: (id) =>
        set((state) => ({
          providers: state.providers.filter((item) => item.id !== id),
        })),
      removeService: (id) =>
        set((state) => ({
          services: state.services.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "petlink-favorites",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useIsProviderFavorite = (id: string) =>
  useFavoritesStore((state) => state.providers.some((item) => item.id === id));

export const useIsServiceFavorite = (id: string) =>
  useFavoritesStore((state) => state.services.some((item) => item.id === id));
