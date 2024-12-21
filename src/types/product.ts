export interface Product {
  id: number | string;
  name: string;
  category: { name: string };
  price: number;
  stock: number;
  brand: string;
  image?: string;
  description?: string;
  inStock: boolean;
  images?: { url: string }[];
  features?: string[];
  specifications?: Record<string, string | number>;
}

export interface ProductFormData {
  name: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
  image?: string;
  description?: string;
  inStock?: boolean;
}
