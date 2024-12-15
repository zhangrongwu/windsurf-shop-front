import React, { useState } from 'react';
import { useCoupon } from '../../contexts/CouponContext';
import useErrorHandler from '../../hooks/useErrorHandler';

interface CouponInputProps {
  subtotal: number;
}

const CouponInput: React.FC<CouponInputProps> = ({ subtotal }) => {
  const [code, setCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const { appliedCoupon, applyCoupon, removeCoupon } = useCoupon();
  const { handleError } = useErrorHandler();

  const handleApplyCoupon = async () => {
    if (!code.trim()) return;

    setIsApplying(true);
    try {
      await applyCoupon(code.trim(), subtotal);
      setCode('');
    } catch (error) {
      handleError(error);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter coupon code"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!!appliedCoupon || isApplying}
          />
        </div>
        {appliedCoupon ? (
          <button
            onClick={removeCoupon}
            className="px-4 py-2 text-red-600 hover:text-red-700 font-medium"
            type="button"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={handleApplyCoupon}
            disabled={!code.trim() || isApplying}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
          >
            {isApplying ? 'Applying...' : 'Apply'}
          </button>
        )}
      </div>
      {appliedCoupon && (
        <div className="mt-2 text-sm">
          <p className="text-green-600">
            Coupon "{appliedCoupon.code}" applied successfully!
            {appliedCoupon.type === 'percentage' ? (
              <span> ({appliedCoupon.value}% off)</span>
            ) : (
              <span> (${appliedCoupon.value} off)</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default CouponInput;
