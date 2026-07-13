import { ProviderServicePreview } from '../../../provider-list/types/provider.type';

export interface ServiceDetailItem extends ProviderServicePreview {
  providerId: string;
  providerName: string;
  targetPets: string[];
  benefits: string[];
  gallery: string[];
  longDescription: string;
}
