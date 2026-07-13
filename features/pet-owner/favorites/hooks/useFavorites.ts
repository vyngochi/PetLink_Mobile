import { useFavoritesStore } from "@/features/pet-owner/shared/stores/favorites.store";

export function useFavorites() {
  const providers = useFavoritesStore((state) => state.providers);
  const services = useFavoritesStore((state) => state.services);
  const removeProvider = useFavoritesStore((state) => state.removeProvider);
  const removeService = useFavoritesStore((state) => state.removeService);

  return { providers, services, removeProvider, removeService };
}
