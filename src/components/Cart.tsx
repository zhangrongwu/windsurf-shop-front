import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useCoupon } from '../contexts/CouponContext';
import useErrorHandler from '../hooks/useErrorHandler';
import { TrashIcon } from '@heroicons/react/24/outline';
import CouponInput from './Cart/CouponInput';

const Cart: React.FC = () => {
  const { state, removeFromCart, updateQuantity } = useCart();
  const { calculateDiscount } = useCoupon();
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();

  const subtotal = state.total;
  const discount = calculateDiscount(subtotal);
  const shipping = subtotal > 100 ? 0 : 10; // 超过100美元免运费
  const tax = (subtotal - discount) * 0.1; // 10%税
  const total = subtotal - discount + shipping + tax;

  const handleQuantityChange = (id: number, quantity: number) => {
    try {
      if (quantity < 1) {
        throw new Error('Quantity must be at least 1');
      }
      updateQuantity(id, quantity);
    } catch (error) {
      handleError(error);
    }
  };

  const handleRemoveItem = (id: number) => {
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
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-gray-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
          <div className="space-y-4">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => handleQuantityChange(Number(item.id), item.quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(Number(item.id), item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(Number(item.id))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <CouponInput subtotal={subtotal} />
        </div>
        <div>
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors mt-4"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
