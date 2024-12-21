export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'cancelled';

export type ReturnStatus =
  | 'REQUESTED'
  | 'APPROVED'
  | 'REJECTED'
  | 'RETURNED'
  | 'REFUNDED';

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image?: string;
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
  id: number;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddress: string;
}

export interface OrderStatusType {
  status: Order['status'];
}

export interface CreateReturnRequestInput {
  orderItemId: string;
  reason: string;
  description: string;
  images?: string[];
}
