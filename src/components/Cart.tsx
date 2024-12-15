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
          <div className="mt-8">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {state.items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <label htmlFor={`quantity-${item.id}`} className="sr-only">
                            Quantity
                          </label>
                          <select
                            id={`quantity-${item.id}`}
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.id, parseInt(e.target.value))
                            }
                            className="rounded-md border border-gray-300 text-base"
                          >
                            {[...Array(10)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-500"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 优惠券和总计 */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <CouponInput subtotal={subtotal} />
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-base text-gray-600">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-base text-green-600">
                  <p>Discount</p>
                  <p>-${discount.toFixed(2)}</p>
                </div>
              )}
              <div className="flex justify-between text-base text-gray-600">
                <p>Shipping</p>
                <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
              </div>
              <div className="flex justify-between text-base text-gray-600">
                <p>Tax (10%)</p>
                <p>${tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleCheckout}
                className="w-full rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
              >
                Checkout
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={() => navigate('/products')}
                className="w-full text-center text-sm text-blue-600 hover:text-blue-500"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
