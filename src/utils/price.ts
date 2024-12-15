export function formatPrice(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function formatPriceRange(
  minPrice: number,
  maxPrice: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  const formattedMin = formatPrice(minPrice, currency, locale);
  const formattedMax = formatPrice(maxPrice, currency, locale);
  return `${formattedMin} - ${formattedMax}`;
}

export function calculateDiscount(
  originalPrice: number,
  discountedPrice: number
): number {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

export function calculateTax(
  amount: number,
  taxRate: number
): number {
  return amount * (taxRate / 100);
}

export function calculateTotal(
  subtotal: number,
  taxRate: number,
  shippingCost: number = 0
): {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
} {
  const tax = calculateTax(subtotal, taxRate);
  return {
    subtotal,
    tax,
    shipping: shippingCost,
    total: subtotal + tax + shippingCost,
  };
}

export function formatPriceWithoutCurrency(
  amount: number,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
