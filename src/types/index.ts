export interface User {
  id: string;
  fullName: string;
  birthDate: string;
  email: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AuthFormData {
  fullName: string;
  birthDate?: string;
  email?: string;
  password: string;
}
