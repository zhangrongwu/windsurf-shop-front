import axios from 'axios';
import { Product } from '../types/product';
import { Order } from '../types/order';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const ApiService = {
  // Auth
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (data: RegisterData): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post('/auth/register', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (email: string): Promise<void> => {
    try {
      await apiClient.post('/auth/forgot-password', { email });
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    try {
      await apiClient.post('/auth/reset-password', { token, password });
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      await apiClient.post('/auth/change-password', 
        { currentPassword, newPassword },
        { 
          headers: { 
            'Authorization': `Bearer ${token}` 
          } 
        }
      );
    } catch (error) {
      throw error;
    }
  },

  // Products
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get('/products');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProduct: async (productId: number): Promise<Product> => {
    try {
      const response = await apiClient.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    try {
      const response = await apiClient.post('/products', productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async (productId: number, productData: Partial<Product>): Promise<Product> => {
    try {
      const response = await apiClient.put(`/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (productId: number): Promise<void> => {
    try {
      await apiClient.delete(`/products/${productId}`);
    } catch (error) {
      throw error;
    }
  },

  // Orders
  getOrders: async (): Promise<Order[]> => {
    try {
      const response = await apiClient.get('/orders');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrderDetails: async (orderId: number): Promise<Order> => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateOrderStatus: async (orderId: number, status: Order['status']): Promise<Order> => {
    try {
      const response = await apiClient.patch(`/orders/${orderId}`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Customer
  getCustomerDetails: async (customerId: number): Promise<User> => {
    try {
      const response = await apiClient.get(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (data: {
    name?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
  }): Promise<User> => {
    try {
      const response = await apiClient.put('/auth/profile', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ApiService;
