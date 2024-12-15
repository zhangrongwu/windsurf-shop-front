export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  message?: string;
} => {
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long',
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter',
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter',
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number',
    };
  }

  return { isValid: true };
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validatePrice = (price: number): boolean => {
  return price > 0 && Number.isFinite(price);
};

export const validateStock = (stock: number): boolean => {
  return stock >= 0 && Number.isInteger(stock);
};

export const validateShippingAddress = (address: {
  fullName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}): { isValid: boolean; message?: string } => {
  if (!address.fullName || address.fullName.trim().length < 2) {
    return {
      isValid: false,
      message: 'Please enter a valid full name',
    };
  }

  if (!address.address || address.address.trim().length < 5) {
    return {
      isValid: false,
      message: 'Please enter a valid address',
    };
  }

  if (!address.city || address.city.trim().length < 2) {
    return {
      isValid: false,
      message: 'Please enter a valid city',
    };
  }

  if (!address.state || address.state.trim().length < 2) {
    return {
      isValid: false,
      message: 'Please enter a valid state',
    };
  }

  if (!address.postalCode || !/^\d{5}(-\d{4})?$/.test(address.postalCode)) {
    return {
      isValid: false,
      message: 'Please enter a valid postal code',
    };
  }

  if (!address.country || address.country.trim().length < 2) {
    return {
      isValid: false,
      message: 'Please enter a valid country',
    };
  }

  return { isValid: true };
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateCreditCard = (cardNumber: string): boolean => {
  // Remove any spaces or dashes
  const cleanNumber = cardNumber.replace(/[\s-]/g, '');
  
  // Check if the number contains only digits and has valid length
  if (!/^\d{13,19}$/.test(cleanNumber)) {
    return false;
  }

  // Luhn algorithm implementation
  let sum = 0;
  let isEven = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

export const validateQuantity = (quantity: number, maxAllowed: number = Infinity): {
  isValid: boolean;
  message?: string;
} => {
  if (!Number.isInteger(quantity)) {
    return {
      isValid: false,
      message: 'Quantity must be a whole number',
    };
  }

  if (quantity < 1) {
    return {
      isValid: false,
      message: 'Quantity must be at least 1',
    };
  }

  if (quantity > maxAllowed) {
    return {
      isValid: false,
      message: `Maximum quantity allowed is ${maxAllowed}`,
    };
  }

  return { isValid: true };
};

export const validateDiscountCode = (code: string): boolean => {
  // Discount codes should be alphanumeric, uppercase, and between 4-10 characters
  return /^[A-Z0-9]{4,10}$/.test(code);
};

export const validateProductReview = (review: {
  rating: number;
  comment: string;
}): { isValid: boolean; message?: string } => {
  if (!Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) {
    return {
      isValid: false,
      message: 'Rating must be a number between 1 and 5',
    };
  }

  if (!review.comment || review.comment.trim().length < 10) {
    return {
      isValid: false,
      message: 'Review comment must be at least 10 characters long',
    };
  }

  return { isValid: true };
};
