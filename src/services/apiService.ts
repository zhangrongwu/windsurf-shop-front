import axios, { AxiosResponse } from 'axios';

// Define interfaces for type safety
interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  [key: string]: any;
}

interface Order {
  id?: number;
  status: string;
  [key: string]: any;
}

interface Customer {
  id?: number;
  name: string;
  email: string;
  [key: string]: any;
}

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  [key: string]: any;
}

// Create an axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Product Management Services
export const ProductService = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response: AxiosResponse<Product[]> = await apiClient.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  createProduct: async (productData: Product): Promise<Product> => {
    try {
      const response: AxiosResponse<Product> = await apiClient.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  updateProduct: async (productId: number, productData: Product): Promise<Product> => {
    try {
      const response: AxiosResponse<Product> = await apiClient.put(`/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (productId: number): Promise<void> => {
    try {
      const response: AxiosResponse<void> = await apiClient.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};

// Order Management Services
export const OrderService = {
  getAllOrders: async (): Promise<Order[]> => {
    try {
      const response: AxiosResponse<Order[]> = await apiClient.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  getOrderDetails: async (orderId: number): Promise<Order> => {
    try {
      const response: AxiosResponse<Order> = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId: number, status: string): Promise<Order> => {
    try {
      const response: AxiosResponse<Order> = await apiClient.patch(`/orders/${orderId}`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
};

// Customer Management Services
export const CustomerService = {
  getAllCustomers: async (): Promise<Customer[]> => {
    try {
      const response: AxiosResponse<Customer[]> = await apiClient.get('/customers');
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  getCustomerDetails: async (customerId: number): Promise<Customer> => {
    try {
      const response: AxiosResponse<Customer> = await apiClient.get(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer details:', error);
      throw error;
    }
  }
};

// Dashboard Statistics Service
export const DashboardService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      const response: AxiosResponse<DashboardStats> = await apiClient.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }
};

export default apiClient;
