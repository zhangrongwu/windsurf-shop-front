import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';

interface CartItem extends Omit<Product, 'category'> {
  quantity: number;
  category: string | { name: string };
}

interface CartContextType {
  state: {
    items: CartItem[];
    total: number;
    itemCount: number;
  };
  cartItems: CartItem[];
  cartTotal: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number | string) => void;
  updateQuantity: (productId: number | string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const calculateTotal = (cartItems: CartItem[]) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateItemCount = (cartItems: CartItem[]) => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const state = {
    items,
    total: calculateTotal(items),
    itemCount: calculateItemCount(items)
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      if (existingItem) {
        return currentItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...currentItems, item];
    });
  };

  const removeFromCart = (productId: number | string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number | string, quantity: number) => {
    if (quantity < 1) return;
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        state, 
        cartItems: items,
        cartTotal: state.total,
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
