import { handleApiError } from './errorHandling';

const BASE_URL = process.env.REACT_APP_API_URL || '';

interface RequestOptions extends RequestInit {
  token?: string;
  params?: Record<string, string>;
}

async function request<T>(
  endpoint: string,
  { token, params, ...customConfig }: RequestOptions = {}
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  let url = `${BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    url += `?${searchParams.toString()}`;
  }

  try {
    const response = await fetch(url, config);
    if (response.ok) {
      return response.json();
    }
    return handleApiError(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `API Error: ${error.message || 'Failed to fetch'}`
      );
    }
    throw error;
  }
}

export const api = {
  get: <T>(
    endpoint: string,
    { token, params }: Omit<RequestOptions, 'body'> = {}
  ) => {
    return request<T>(endpoint, { method: 'GET', token, params });
  },

  post: <T>(
    endpoint: string,
    data: unknown,
    { token, ...customConfig }: Omit<RequestOptions, 'body'> = {}
  ) => {
    return request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      token,
      ...customConfig,
    });
  },

  put: <T>(
    endpoint: string,
    data: unknown,
    { token, ...customConfig }: Omit<RequestOptions, 'body'> = {}
  ) => {
    return request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      token,
      ...customConfig,
    });
  },

  delete: <T>(
    endpoint: string,
    { token, ...customConfig }: Omit<RequestOptions, 'body'> = {}
  ) => {
    return request<T>(endpoint, {
      method: 'DELETE',
      token,
      ...customConfig,
    });
  },
};
