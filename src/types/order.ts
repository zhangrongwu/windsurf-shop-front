export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

export type ReturnStatus =
  | 'REQUESTED'
  | 'APPROVED'
  | 'REJECTED'
  | 'RETURNED'
  | 'REFUNDED';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderTracking {
  id: string;
  orderId: string;
  status: OrderStatus;
  location?: string;
  description: string;
  timestamp: Date;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  orderItemId: string;
  reason: string;
  description: string;
  images?: string[];
  status: ReturnStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  shippingAddress: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phone: string;
  };
  shippingMethod: {
    name: string;
    price: number;
    estimatedDays: number;
  };
  tracking?: OrderTracking[];
  returnRequests?: ReturnRequest[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  tax: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReturnRequestInput {
  orderItemId: string;
  reason: string;
  description: string;
  images?: string[];
}
