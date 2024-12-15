import axios from 'axios';
import { Review, CreateReviewInput, UpdateReviewInput, ProductReviewStats } from '../types/review';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export const reviewService = {
  // 获取产品的所有评论
  getProductReviews: async (productId: string): Promise<Review[]> => {
    const response = await axios.get(`${API_BASE_URL}/api/products/${productId}/reviews`);
    return response.data;
  },

  // 获取产品的评论统计
  getProductReviewStats: async (productId: string): Promise<ProductReviewStats> => {
    const response = await axios.get(`${API_BASE_URL}/api/products/${productId}/review-stats`);
    return response.data;
  },

  // 创建新评论
  createReview: async (review: CreateReviewInput): Promise<Review> => {
    const response = await axios.post(`${API_BASE_URL}/api/reviews`, review);
    return response.data;
  },

  // 更新评论
  updateReview: async (reviewId: string, review: UpdateReviewInput): Promise<Review> => {
    const response = await axios.put(`${API_BASE_URL}/api/reviews/${reviewId}`, review);
    return response.data;
  },

  // 删除评论
  deleteReview: async (reviewId: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/api/reviews/${reviewId}`);
  },

  // 标记评论有帮助
  markReviewHelpful: async (reviewId: string): Promise<Review> => {
    const response = await axios.post(`${API_BASE_URL}/api/reviews/${reviewId}/helpful`);
    return response.data;
  }
};
