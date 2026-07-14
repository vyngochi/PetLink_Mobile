import { useFavoritesStore } from "@/features/pet-owner/shared/stores/favorites.store";

export function useFavorites() {
  const providers = useFavoritesStore((state) => state.providers);
  const services = useFavoritesStore((state) => state.services);
  const removeProvider = useFavoritesStore((state) => state.removeProvider);
  const removeService = useFavoritesStore((state) => state.removeService);

  const removeMultipleProviders = useFavoritesStore((state) => state.removeMultipleProviders);
  const removeMultipleServices = useFavoritesStore((state) => state.removeMultipleServices);
  const clearAllProviders = useFavoritesStore((state) => state.clearAllProviders);
  const clearAllServices = useFavoritesStore((state) => state.clearAllServices);

  return { 
    providers, 
    services, 
    removeProvider, 
    removeService,
    removeMultipleProviders,
    removeMultipleServices,
    clearAllProviders,
    clearAllServices
  };
}
