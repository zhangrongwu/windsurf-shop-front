import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { CreateReviewInput } from '../../types/review';

interface ReviewFormProps {
  productId: string;
  onSubmit: (review: CreateReviewInput) => Promise<void>;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        productId,
        rating,
        comment,
        images,
      });
      // 重置表单
      setRating(0);
      setComment('');
      setImages([]);
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // 这里应该实现图片上传到服务器的逻辑
    // 现在只是模拟上传成功后获取URL
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Write a Review</h3>
        
        {/* 评分选择 */}
        <div className="mt-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <StarIcon
                key={value}
                className={`h-8 w-8 flex-shrink-0 cursor-pointer ${
                  value <= (hoveredRating || rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(value)}
              />
            ))}
          </div>
        </div>

        {/* 评论文本 */}
        <div className="mt-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Your Review
          </label>
          <textarea
            id="comment"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about the product..."
          />
        </div>

        {/* 图片上传 */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Add Photos
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Upload Images
            </label>
            {images.length > 0 && (
              <span className="text-sm text-gray-500">
                {images.length} image(s) selected
              </span>
            )}
          </div>
          {images.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="h-20 w-20 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        {/* 提交按钮 */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
