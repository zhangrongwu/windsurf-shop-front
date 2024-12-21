import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // 处理401未授权错误
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      // 返回错误信息
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => api.post('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),

  verifyEmail: (token: string) => api.post('/auth/verify-email', { token }),

  resendVerification: (email: string) =>
    api.post('/auth/resend-verification', { email }),

  me: () => api.get('/auth/me'),
};

// Product API
export const productApi = {
  getAll: (params?: { category?: string; search?: string }) =>
    api.get('/products', { params }),

  getById: (id: string) => api.get(`/products/${id}`),

  create: (data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    categoryId: string;
  }) => api.post('/products', data),

  update: (id: string, data: Partial<{
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    categoryId: string;
  }>) => api.put(`/products/${id}`, data),

  delete: (id: string) => api.delete(`/products/${id}`),
};

// Category API
export const categoryApi = {
  getAll: () => api.get('/categories'),
  create: (data: { name: string }) => api.post('/categories', data),
};

// Cart API
export const cartApi = {
  get: () => api.get('/cart'),
  
  addItem: (data: { productId: string; quantity: number }) =>
    api.post('/cart/items', data),
  
  updateItem: (productId: string, quantity: number) =>
    api.put(`/cart/items/${productId}`, { quantity }),
  
  removeItem: (productId: string) =>
    api.delete(`/cart/items/${productId}`),
  
  clear: () => api.delete('/cart'),
};

// Order API
export const orderApi = {
  create: (data: {
    items: Array<{ productId: string; quantity: number }>;
    shippingInfo: {
      address: string;
      city: string;
      country: string;
      postalCode: string;
    };
  }) => api.post('/orders', data),

  getAll: () => api.get('/orders'),
  
  getById: (id: string) => api.get(`/orders/${id}`),
  
  cancel: (id: string) => api.post(`/orders/${id}/cancel`),
};

// Review API
export const reviewApi = {
  create: (productId: string, data: {
    rating: number;
    comment: string;
  }) => api.post(`/products/${productId}/reviews`, data),

  getByProduct: (productId: string) =>
    api.get(`/products/${productId}/reviews`),
};
