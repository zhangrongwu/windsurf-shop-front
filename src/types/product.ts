export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
  image?: string;
  description?: string;
  inStock: boolean;
}

export interface ProductFormData {
  name: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
  image?: string;
  description?: string;
}
