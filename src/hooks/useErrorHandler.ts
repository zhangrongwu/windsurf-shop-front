import { useCallback } from 'react';
import { useError } from '../contexts/ErrorContext';
import { useNotification } from '../contexts/NotificationContext';
import { getErrorMessage, isAuthenticationError } from '../utils/errorHandling';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useErrorHandler = () => {
  const { showError } = useError();
  const { showNotification } = useNotification();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleError = useCallback(
    (error: unknown) => {
      const message = getErrorMessage(error);

      // 显示错误通知
      showNotification('error', message);

      // 对于身份验证错误，自动登出并重定向到登录页面
      if (isAuthenticationError(error)) {
        logout();
        navigate('/login', { state: { from: window.location.pathname } });
      }

      // 同时在错误上下文中显示错误
      showError(message);
    },
    [showError, showNotification, logout, navigate]
  );

  return {
    handleError,
  };
};

export default useErrorHandler;
