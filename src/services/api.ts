import axios, { AxiosInstance } from 'axios';

interface LoginResponse {
  token: string;
  user: User;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  password?: string;
}

class ApiService {
  private static instance: AxiosInstance = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  static {
    this.instance.interceptors.request.use(
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

    this.instance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error.response?.data || error);
      }
    );
  }

  // 认证相关
  static async login(email: string, password: string): Promise<LoginResponse> {
    return this.instance.post('/auth/login', { email, password });
  }

  static async register(userData: RegisterData): Promise<LoginResponse> {
    return this.instance.post('/auth/register', userData);
  }

  static async getUserProfile(): Promise<User> {
    return this.instance.get('/user/profile');
  }

  static async updateUserProfile(userData: UpdateProfileData): Promise<User> {
    return this.instance.put('/user/profile', userData);
  }

  // 密码重置相关方法
  static async forgotPassword(email: string): Promise<void> {
    return this.instance.post('/auth/forgot-password', { email });
  }

  static async resetPassword(token: string, password: string): Promise<void> {
    return this.instance.post('/auth/reset-password', { token, password });
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    return this.instance.post('/auth/change-password', { currentPassword, newPassword });
  }
}

export default ApiService;
