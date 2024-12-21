import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import ApiService from '../../services/api';
import { Product } from '../../types/product';
import { StarIcon } from '@heroicons/react/24/solid';

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await ApiService.getProductById(id!);
        setProduct(fetchedProduct);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity,
        category: product.category.name,
        inStock: product.inStock,
        image: product.images?.[0]?.url || '/placeholder.png'
      });
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="flex justify-center items-center">
        <img 
          src={product.images?.[0]?.url || '/placeholder.png'} 
          alt={product.name} 
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Product Details */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <div className="flex items-center mb-4">
          <span className="text-2xl font-semibold text-primary-600 mr-4">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon 
                key={star} 
                className={`h-5 w-5 ${
                  star <= 4 ? 'text-yellow-400' : 'text-gray-300'
                }`} 
              />
            ))}
            <span className="ml-2 text-gray-600">(4 reviews)</span>
          </div>
        </div>

        <p className="text-gray-600 mb-6">{product.description}</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Specifications</h3>
          <ul className="list-disc list-inside">
            <li>Brand: {product.brand}</li>
            <li>Category: {product.category.name}</li>
            <li>Stock: {product.stock} available</li>
          </ul>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center border rounded-md">
            <button 
              onClick={() => handleQuantityChange(-1)}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-l-md"
            >
              -
            </button>
            <span className="px-4 py-2">{quantity}</span>
            <button 
              onClick={() => handleQuantityChange(1)}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-r-md"
            >
              +
            </button>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`
              px-6 py-2 rounded-md text-white font-semibold 
              ${product.inStock 
                ? 'bg-primary-600 hover:bg-primary-700' 
                : 'bg-gray-400 cursor-not-allowed'
              }
            `}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>

        {user && user.role === 'ADMIN' && (
          <div className="mt-6">
            <button 
              onClick={() => navigate(`/admin/products/edit/${product.id}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
