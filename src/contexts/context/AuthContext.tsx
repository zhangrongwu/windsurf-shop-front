import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ApiService from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  register: (userData: RegisterData) => Promise<User>;
  logout: () => void;
  updateProfile: (userData: UpdateProfileData) => Promise<User>;
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

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await ApiService.getUserProfile();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<User> => {
    try {
      setError(null);
      const { token, user } = await ApiService.login(email, password);
      localStorage.setItem('token', token);
      setUser(user);
      return user;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const register = async (userData: RegisterData): Promise<User> => {
    try {
      setError(null);
      const { token, user } = await ApiService.register(userData);
      localStorage.setItem('token', token);
      setUser(user);
      return user;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (userData: UpdateProfileData): Promise<User> => {
    try {
      setError(null);
      const updatedUser = await ApiService.updateUserProfile(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
