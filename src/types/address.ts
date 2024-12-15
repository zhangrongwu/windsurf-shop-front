export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAddressInput {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  isDefault?: boolean;
}

export interface UpdateAddressInput extends Partial<CreateAddressInput> {
  isDefault?: boolean;
}

export interface ShippingRate {
  id: string;
  name: string;
  price: number;
  currency: string;
  transitTime: {
    minimum: number;
    maximum: number;
  };
}

export interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  regions?: string[];
  rates: ShippingRate[];
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
  freeShippingThreshold?: number;
  provider: string;
  serviceLevel: string;
  transitTime: {
    minimum: number;
    maximum: number;
  };
  restrictions?: {
    minWeight?: number;
    maxWeight?: number;
    minTotal?: number;
    maxTotal?: number;
    restrictedItems?: string[];
  };
  metadata?: Record<string, any>;
}
