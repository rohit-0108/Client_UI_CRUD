// all interfaces/types

// Auth
export interface RegisterRequest {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

// Product
export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductRequest {
  id: number;
  name: string;
  price: number;
}

// Auth Context
export interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}