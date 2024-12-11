const STORAGE_PREFIX = 'windsurf_shop_';

export const storage = {
  getToken: (): string | null => {
    return window.localStorage.getItem(`${STORAGE_PREFIX}token`);
  },

  setToken: (token: string): void => {
    window.localStorage.setItem(`${STORAGE_PREFIX}token`, token);
  },

  clearToken: (): void => {
    window.localStorage.removeItem(`${STORAGE_PREFIX}token`);
  },

  getCart: <T>(): T | null => {
    const cart = window.localStorage.getItem(`${STORAGE_PREFIX}cart`);
    return cart ? JSON.parse(cart) : null;
  },

  setCart: <T>(cart: T): void => {
    window.localStorage.setItem(`${STORAGE_PREFIX}cart`, JSON.stringify(cart));
  },

  clearCart: (): void => {
    window.localStorage.removeItem(`${STORAGE_PREFIX}cart`);
  },

  getUser: <T>(): T | null => {
    const user = window.localStorage.getItem(`${STORAGE_PREFIX}user`);
    return user ? JSON.parse(user) : null;
  },

  setUser: <T>(user: T): void => {
    window.localStorage.setItem(`${STORAGE_PREFIX}user`, JSON.stringify(user));
  },

  clearUser: (): void => {
    window.localStorage.removeItem(`${STORAGE_PREFIX}user`);
  },

  clear: (): void => {
    Object.keys(window.localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        window.localStorage.removeItem(key);
      }
    });
  },
};
