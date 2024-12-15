export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  userName: string;
  helpful: number;
  images?: string[];
}

export interface CreateReviewInput {
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
}

export interface UpdateReviewInput {
  rating?: number;
  comment?: string;
  images?: string[];
}

export interface ProductReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;  // key: rating (1-5), value: count
  };
}
