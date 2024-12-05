const API_URL = process.env.REACT_APP_API_URL;

class ApiService {
  static async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // 认证相关
  static async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  static async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // 产品相关
  static async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products?${queryString}`);
  }

  static async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  static async getCategories() {
    return this.request('/categories');
  }

  // 购物车和结账相关
  static async createCheckoutSession(cartItems, customerEmail) {
    return this.request('/cart/checkout', {
      method: 'POST',
      body: JSON.stringify({
        items: cartItems,
        customerEmail,
      }),
    });
  }

  // 订单相关
  static async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  static async getOrders() {
    return this.request('/orders');
  }

  static async getOrder(id) {
    return this.request(`/orders/${id}`);
  }

  // 用户相关
  static async getUserProfile() {
    return this.request('/user/profile');
  }

  static async updateUserProfile(userData) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // 密码重置相关方法
  static async forgotPassword(email) {
    return this.request('/password/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  static async resetPassword(token, password) {
    return this.request('/password/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  }

  static async changePassword(currentPassword, newPassword) {
    return this.request('/password/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }
}

export default ApiService;
