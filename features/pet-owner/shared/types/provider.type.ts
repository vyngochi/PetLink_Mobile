export interface ProviderCoordinates {
  lat: number;
  lng: number;
}

export interface ProviderLocation {
  address: string;
  ward: string;
  district: string;
  province: string;
  coordinates: ProviderCoordinates;
  distanceKm: number;
}

export interface ProviderRating {
  average: number;
  totalReviews: number;
}

export interface ProviderPriceRange {
  min: number;
  max: number;
  currency: string;
}

export interface ProviderServicePreview {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  thumbnailUrl: string;
  description?: string;
}

export interface ProviderServices {
  total: number;
  categories: string[];
  priceRange: ProviderPriceRange;
  preview: ProviderServicePreview[];
}

export interface ProviderAvailability {
  isOpenNow: boolean;
  canBookFuture: boolean;
  todayOpeningHours: {
    open: string;
    close: string;
  };
}

export interface ProviderPaymentMethods {
  online: boolean;
  cash: boolean;
}

export interface ProviderItem {
  id: string;
  slug: string;
  businessName: string;
  avatarUrl: string;
  coverImageUrl: string;
  description: string;
  isVerified: boolean;
  status: string;
  location: ProviderLocation;
  rating: ProviderRating;
  services: ProviderServices;
  availability: ProviderAvailability;
  paymentMethods: ProviderPaymentMethods;
  createdAt: string;
}

export interface GetProvidersParams {
  q?: string;
  searchKey?: string;
  page?: number;
  pageSize?: number;
  userLat?: number;
  userLng?: number;
  minRating?: number;
  maxRating?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface GlobalSearchResponse {
  providers: string[];
  services: string[];
}

export interface ProviderPagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProviderListResponse {
  items: ProviderItem[];
  pagination: ProviderPagination;
}
