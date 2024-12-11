import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useError } from './ErrorContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock?: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // Check stock limit
        if (action.payload.stock && existingItem.quantity >= action.payload.stock) {
          throw new Error(`Sorry, only ${action.payload.stock} items available in stock.`);
        }
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };
    }
    case 'REMOVE_ITEM': {
      const item = state.items.find(item => item.id === action.payload);
      if (!item) return state;
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - item.price * item.quantity,
      };
    }
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.id === action.payload.id);
      if (!item) return state;
      const quantityDiff = action.payload.quantity - item.quantity;
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + item.price * quantityDiff,
      };
    }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
      };
    default:
      return state;
  }
};

const CART_STORAGE_KEY = 'windsurf_shop_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  const { showError } = useError();

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const { items, total } = JSON.parse(savedCart);
        dispatch({ type: 'CLEAR_CART' });
        items.forEach((item: CartItem) => {
          dispatch({ type: 'ADD_ITEM', payload: item });
        });
      }
    } catch (error) {
      showError('Failed to load cart data. Please try refreshing the page.');
      console.error('Error loading cart:', error);
    }
  }, [showError]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      showError('Failed to save cart data. Your cart changes might not persist.');
      console.error('Error saving cart:', error);
    }
  }, [state, showError]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    try {
      dispatch({ type: 'ADD_ITEM', payload: item as CartItem });
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('Failed to add item to cart');
      }
    }
  };

  const removeFromCart = (id: string) => {
    try {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } catch (error) {
      showError('Failed to remove item from cart');
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    try {
      const item = state.items.find(item => item.id === id);
      if (!item) {
        throw new Error('Item not found in cart');
      }
      if (item.stock && quantity > item.stock) {
        throw new Error(`Sorry, only ${item.stock} items available in stock.`);
      }
      if (quantity < 1) {
        throw new Error('Quantity must be at least 1');
      }
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('Failed to update item quantity');
      }
    }
  };

  const clearCart = () => {
    try {
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      showError('Failed to clear cart');
    }
  };

  return (
    <CartContext.Provider
      value={{ state, dispatch, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
