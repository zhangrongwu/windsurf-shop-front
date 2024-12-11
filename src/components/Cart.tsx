import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import useErrorHandler from '../hooks/useErrorHandler';
import { TrashIcon } from '@heroicons/react/24/outline';

const Cart: React.FC = () => {
  const { state, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();

  const handleQuantityChange = (id: string, quantity: number) => {
    try {
      if (quantity < 1) {
        throw new Error('Quantity must be at least 1');
      }
      updateQuantity(id, quantity);
    } catch (error) {
      handleError(error);
    }
  };

  const handleRemoveItem = (id: string) => {
    try {
      removeFromCart(id);
    } catch (error) {
      handleError(error);
    }
  };

  const handleCheckout = () => {
    try {
      if (state.items.length === 0) {
        throw new Error('Your cart is empty');
      }
      navigate('/checkout');
    } catch (error) {
      handleError(error);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
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
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {state.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-gray-200 py-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300 disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300 disabled:opacity-50"
                    disabled={item.stock ? item.quantity >= item.stock : false}
                  >
                    +
                  </button>
                </div>
                {item.stock && item.quantity >= item.stock && (
                  <p className="text-red-500 text-sm mt-1">
                    Maximum stock reached
                  </p>
                )}
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-600 hover:text-red-800 ml-4"
                aria-label={`Remove ${item.name} from cart`}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%)</span>
              <span>${(state.total * 0.1).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  ${(state.total + 10 + state.total * 0.1).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-md mt-6 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={state.items.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
