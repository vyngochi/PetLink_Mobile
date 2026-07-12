export type FavoriteTab = "provider" | "service";

export interface FavoriteProvider {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  rating: number;
  distanceKm: number;
}

export interface FavoriteService {
  id: string;
  name: string;
  providerName: string;
  imageUrl: string;
  price: number;
  durationMinutes: number;
}

export interface Favorites {
  providers: FavoriteProvider[];
  services: FavoriteService[];
}
