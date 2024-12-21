import React, { createContext, useContext, useState, useEffect } from 'react';
import authService, { AuthResponse } from '../services/auth';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
  logout: () => void;
  resendVerification: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查本地存储中的用户信息
    const storedUser = authService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const handleAuthResponse = (response: AuthResponse) => {
    authService.setAuth(response);
    setUser(response.user);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      handleAuthResponse(response);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      const response = await authService.register(data);
      handleAuthResponse(response);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const resendVerification = async (email: string) => {
    try {
      await authService.resendVerification(email);
    } catch (error) {
      console.error('Resend verification error:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        resendVerification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
