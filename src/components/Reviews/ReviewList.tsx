import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { Review, ProductReviewStats } from '../../types/review';
import { formatDate } from '../../utils/dateUtils';

interface ReviewListProps {
  reviews: Review[];
  stats: ProductReviewStats;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, stats }) => {
  return (
    <div className="mt-8">
      {/* 评分统计 */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Customer Reviews</h2>
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={`${
                    rating < Math.round(stats.averageRating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  } h-5 w-5 flex-shrink-0`}
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-700">
              Based on {stats.totalReviews} reviews
            </p>
          </div>
        </div>
      </div>

      {/* 评分分布 */}
      <div className="mt-4">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center mt-1">
            <span className="text-sm text-gray-600 w-8">{rating}★</span>
            <div className="w-48 h-2 mx-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-yellow-400 rounded"
                style={{
                  width: `${(stats.ratingDistribution[rating] / stats.totalReviews) * 100}%`,
                }}
              />
            </div>
            <span className="text-sm text-gray-600">
              {stats.ratingDistribution[rating] || 0}
            </span>
          </div>
        ))}
      </div>

      {/* 评论列表 */}
      <div className="mt-8 space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-8">
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`${
                      rating < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    } h-5 w-5 flex-shrink-0`}
                  />
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-600">{review.userName}</p>
              <span className="mx-2 text-gray-300">•</span>
              <time className="text-sm text-gray-600">
                {formatDate(review.createdAt)}
              </time>
            </div>
            <p className="text-gray-800">{review.comment}</p>
            
            {/* 评论图片 */}
            {review.images && review.images.length > 0 && (
              <div className="mt-4 flex space-x-2">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="h-20 w-20 object-cover rounded"
                  />
                ))}
              </div>
            )}

            {/* 有帮助按钮 */}
            <div className="mt-4 flex items-center">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
              >
                <span>Helpful ({review.helpful})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
