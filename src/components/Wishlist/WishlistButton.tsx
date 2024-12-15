import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useWishlist } from '../../contexts/WishlistContext';
import useErrorHandler from '../../hooks/useErrorHandler';

interface WishlistButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { handleError } = useErrorHandler();

  const toggleWishlist = () => {
    try {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {isInWishlist(product.id) ? (
        <HeartIconSolid className="h-6 w-6 text-red-500" />
      ) : (
        <HeartIcon className="h-6 w-6 text-gray-400 hover:text-red-500" />
      )}
    </button>
  );
};

export default WishlistButton;
