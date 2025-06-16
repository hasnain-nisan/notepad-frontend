import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth.types';

// Interface Segregation Principle
export interface IAuthRepository {
  login(credentials: LoginRequest): Promise<AuthResponse>;
  register(userData: RegisterRequest): Promise<AuthResponse>;
}