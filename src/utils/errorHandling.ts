import { ApiError } from '../types';

export class AppError extends Error {
  statusCode: number;
  errorCode?: string;

  constructor(message: string, statusCode: number = 500, errorCode?: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.name = 'AppError';
  }
}

export const handleApiError = async (response: Response): Promise<never> => {
  let errorData: ApiError;
  try {
    errorData = await response.json();
  } catch {
    throw new AppError(
      'An unexpected error occurred',
      response.status
    );
  }
  throw new AppError(errorData.message, errorData.statusCode, errorData.errorCode);
};

export const handleError = (error: unknown): { message: string; statusCode?: number; errorCode?: string } => {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      errorCode: error.errorCode,
    };
  }
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }
  return {
    message: 'An unexpected error occurred',
  };
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof Error && (
    error.message.includes('Failed to fetch') ||
    error.message.includes('Network request failed') ||
    error.message.includes('Network Error')
  );
};

export const isAuthenticationError = (error: unknown): boolean => {
  if (error instanceof AppError) {
    return error.statusCode === 401;
  }
  return false;
};

export const isAuthorizationError = (error: unknown): boolean => {
  if (error instanceof AppError) {
    return error.statusCode === 403;
  }
  return false;
};

export const isValidationError = (error: unknown): boolean => {
  if (error instanceof AppError) {
    return error.statusCode === 400;
  }
  return false;
};

export const getErrorMessage = (error: unknown): string => {
  const { message } = handleError(error);
  if (isNetworkError(error)) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }
  if (isAuthenticationError(error)) {
    return 'Please log in to continue.';
  }
  if (isAuthorizationError(error)) {
    return 'You do not have permission to perform this action.';
  }
  if (isValidationError(error)) {
    return message || 'Please check your input and try again.';
  }
  return message;
};
