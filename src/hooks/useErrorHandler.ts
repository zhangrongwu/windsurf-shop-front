import { useCallback } from 'react';
import { useError } from '../contexts/ErrorContext';
import { getErrorMessage, isAuthenticationError } from '../utils/errorHandling';
import { useNavigate } from 'react-router-dom';

export const useErrorHandler = () => {
  const { showError } = useError();
  const navigate = useNavigate();

  const handleError = useCallback(
    (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);

      // Redirect to login page if authentication error
      if (isAuthenticationError(error)) {
        navigate('/login');
      }
    },
    [showError, navigate]
  );

  return {
    handleError,
  };
};

export default useErrorHandler;
