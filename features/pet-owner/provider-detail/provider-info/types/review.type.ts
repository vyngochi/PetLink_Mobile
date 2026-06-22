export interface ProviderReview {
  id: string;
  providerId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  serviceName: string;
  createdAt: string;
}
