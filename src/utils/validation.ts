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
