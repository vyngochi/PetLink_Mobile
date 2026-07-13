export interface ApiReviewUser {
  id: string;
  name: string | null;
  avatarUrl: string | null;
}

export interface ApiProviderReview {
  id: string;
  bookingId: string;
  rating: number;
  comment: string | null;
  images: string[];
  createdAt: string;
  updatedAt: string;
  user: ApiReviewUser;
}

export interface ProviderReviewsResponse {
  responseReviews: ApiProviderReview[];
  page: number;
  pageSize: number;
  total: number;
}

export interface ProviderReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  images: string[];
  createdAt: string;
}
