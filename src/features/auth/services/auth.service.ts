import type { IAuthRepository } from '../repositories/auth.repository.interface';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth.types';

// Single Responsibility Principle - Business logic for auth
export interface IAuthService {
  login(credentials: LoginRequest): Promise<AuthResponse>;
  register(userData: RegisterRequest): Promise<AuthResponse>;
  logout(): void;
  getStoredToken(): string | null;
  setStoredToken(token: string): void;
}

export class AuthService implements IAuthService {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.authRepository.login(credentials);
    this.setStoredToken(response.access_token);
    return response;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await this.authRepository.register(userData);
    this.setStoredToken(response.access_token);
    return response;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getStoredToken(): string | null {
    return localStorage.getItem('token');
  }

  setStoredToken(token: string): void {
    localStorage.setItem('token', token);
  }
}