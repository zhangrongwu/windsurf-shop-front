import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useError } from './ErrorContext';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  addedAt: Date;
}

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' };

const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
} | null>(null);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, addedAt: new Date() }],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    }
    case 'CLEAR_WISHLIST': {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
};

const WISHLIST_STORAGE_KEY = 'windsurf_shop_wishlist';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { handleError } = useError();
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  // 从本地存储加载愿望清单
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        parsedWishlist.items.forEach((item: WishlistItem) => {
          dispatch({ type: 'ADD_ITEM', payload: item });
        });
      }
    } catch (error) {
      handleError(error);
    }
  }, [handleError]);

  // 保存愿望清单到本地存储
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      handleError(error);
    }
  }, [state, handleError]);

  const addToWishlist = (item: Omit<WishlistItem, 'addedAt'>) => {
    try {
      dispatch({ type: 'ADD_ITEM', payload: item as WishlistItem });
    } catch (error) {
      handleError(error);
    }
  };

  const removeFromWishlist = (id: string) => {
    try {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } catch (error) {
      handleError(error);
    }
  };

  const clearWishlist = () => {
    try {
      dispatch({ type: 'CLEAR_WISHLIST' });
    } catch (error) {
      handleError(error);
    }
  };

  const isInWishlist = (id: string) => {
    return state.items.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        state,
        dispatch,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
