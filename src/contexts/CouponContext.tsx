import React, { createContext, useContext, useState } from 'react';
import { useError } from './ErrorContext';

interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  expiryDate?: Date;
}

interface CouponContextType {
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string, cartTotal: number) => Promise<void>;
  removeCoupon: () => void;
  calculateDiscount: (subtotal: number) => number;
}

const CouponContext = createContext<CouponContextType | null>(null);

// 模拟优惠券数据库
const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minPurchase: 50,
  },
  {
    code: 'SUMMER20',
    type: 'percentage',
    value: 20,
    minPurchase: 100,
    expiryDate: new Date('2024-12-31'),
  },
  {
    code: 'FIXED15',
    type: 'fixed',
    value: 15,
    minPurchase: 75,
  },
];

export const CouponProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const { handleError } = useError();

  const applyCoupon = async (code: string, cartTotal: number) => {
    try {
      const coupon = AVAILABLE_COUPONS.find(
        (c) => c.code.toLowerCase() === code.toLowerCase()
      );

      if (!coupon) {
        throw new Error('Invalid coupon code');
      }

      if (coupon.expiryDate && new Date() > coupon.expiryDate) {
        throw new Error('Coupon has expired');
      }

      if (coupon.minPurchase && cartTotal < coupon.minPurchase) {
        throw new Error(
          `Minimum purchase amount of $${coupon.minPurchase} required for this coupon`
        );
      }

      setAppliedCoupon(coupon);
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const calculateDiscount = (subtotal: number): number => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.type === 'percentage') {
      return (subtotal * appliedCoupon.value) / 100;
    } else {
      return Math.min(appliedCoupon.value, subtotal);
    }
  };

  return (
    <CouponContext.Provider
      value={{
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        calculateDiscount,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupon must be used within a CouponProvider');
  }
  return context;
};
