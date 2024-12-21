import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../context/CartContext';
import useErrorHandler from '../hooks/useErrorHandler';
import { TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { CartItem } from '../context/CartContext';

const Wishlist: React.FC = () => {
  const { state, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();

  const handleRemoveItem = (id: string) => {
    try {
      removeFromWishlist(id);
    } catch (error) {
      handleError(error);
    }
  };

  const handleMoveToCart = (item: any) => {
    try {
      const cartItem: CartItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        category: item.category,
        stock: item.stock,
        brand: item.brand,
        inStock: item.inStock
      };
      addToCart(cartItem);
      removeFromWishlist(item.id);
    } catch (error) {
      handleError(error);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-w-1 aspect-h-1 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-48 rounded-md"
              />
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Added on {new Date(item.addedAt).toLocaleDateString()}
            </p>
            <div className="flex justify-between gap-2">
              <button
                onClick={() => handleMoveToCart(item)}
                className="flex items-center justify-center gap-2 flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                Move to Cart
              </button>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="flex items-center justify-center p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                aria-label="Remove from wishlist"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
