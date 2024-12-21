import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useError } from './ErrorContext';
import ApiService from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  updateUser?: (userData: Partial<User>) => Promise<void>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showError } = useError();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userData);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      const response = await ApiService.register({ 
        firstName, 
        lastName, 
        email, 
        password 
      });
      setUser(response.user);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/');
    } catch (error) {
      showError('Registration failed');
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await ApiService.login({ email, password });
      setUser(response.user);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/');
    } catch (error) {
      showError('Login failed');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      const updatedUser = await ApiService.updateUser(userData);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      showError('Failed to update user profile');
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        register, 
        login, 
        logout, 
        isAuthenticated,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
