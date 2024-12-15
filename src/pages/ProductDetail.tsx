import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Review, ProductReviewStats, CreateReviewInput } from '../types/review';
import { reviewService } from '../services/reviewService';
import ReviewList from '../components/Reviews/ReviewList';
import ReviewForm from '../components/Reviews/ReviewForm';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  specifications: Record<string, string>;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewStats, setReviewStats] = useState<ProductReviewStats>({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: {},
  });
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [productRes, reviewsRes, statsRes] = await Promise.all([
          fetch(`/api/products/${id}`),
          reviewService.getProductReviews(id!),
          reviewService.getProductReviewStats(id!)
        ]);

        if (!productRes.ok) {
          throw new Error('Product not found');
        }

        const productData = await productRes.json();
        setProduct(productData);
        setReviews(reviewsRes);
        setReviewStats(statsRes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    if (!product) return;

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity,
      },
    });

    navigate('/cart');
  };

  const handleReviewSubmit = async (reviewData: CreateReviewInput) => {
    try {
      const newReview = await reviewService.createReview(reviewData);
      setReviews([newReview, ...reviews]);
      
      // 更新评论统计
      const newStats = await reviewService.getProductReviewStats(id!);
      setReviewStats(newStats);
    } catch (error) {
      console.error('Failed to submit review:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">{error || 'Product not found'}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <div className="text-2xl font-bold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <span className="font-medium text-gray-700">{key}:</span>{' '}
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="quantity" className="block text-gray-700 mb-2">
              Quantity
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={product.stock === 0}
            >
              {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 px-6 rounded-md ${
              product.stock === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>

          {product.stock > 0 && product.stock <= 5 && (
            <p className="mt-2 text-red-600">
              Only {product.stock} items left in stock!
            </p>
          )}
        </div>
      </div>

      {/* 产品评论部分 */}
      <div className="mt-16 lg:col-span-2">
        <ReviewList reviews={reviews} stats={reviewStats} />
        <ReviewForm productId={id!} onSubmit={handleReviewSubmit} />
      </div>
    </div>
  );
};

export default ProductDetail;
