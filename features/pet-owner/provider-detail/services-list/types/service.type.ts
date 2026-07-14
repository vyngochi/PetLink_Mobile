export interface ApiProviderService {
  id: string;
  providerId: string;
  name: string;
  description: string | null;
  longDescription: string;
  price: number;
  duration: number;
  category: string;
  imageUrls: string[];
  targetPets: string[];
  benefits: string[];
  isActive: boolean;
  isHiddenByAdmin: boolean;
  createAt: string;
  updateAt: string;
}

export interface ProviderServicesResponse {
  data: ApiProviderService[];
  page: number;
  pageSize: number;
  total: number;
}
