import { STORAGE_KEYS } from '@/libs/constants';
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository';
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from '@/types/auth.types';

export class AuthService {
  private authRepository: IAuthRepository;

  constructor() {
    this.authRepository = RepositoryFactory.getAuthRepository();
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.authRepository.login(credentials);
      
      // Store tokens and user data
      this.storeAuthData(response);
      
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await this.authRepository.register(credentials);
      
      // Store tokens and user data
      this.storeAuthData(response);
      
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authRepository.logout();
    } catch (error) {
      // Even if logout fails on server, clear local data
      console.warn('Server logout failed:', error);
    } finally {
      this.clearAuthData();
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      return await this.authRepository.getCurrentUser();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async refreshToken(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await this.authRepository.refreshToken({ refreshToken });
      
      // Update stored tokens
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
    } catch (error) {
      // If refresh fails, clear auth data and redirect to login
      this.clearAuthData();
      throw this.handleError(error);
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    
    return !!(token && user);
  }

  getStoredUser(): User | null {
    const userString = localStorage.getItem(STORAGE_KEYS.USER);
    
    if (!userString) return null;
    
    try {
      return JSON.parse(userString);
    } catch {
      return null;
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  private storeAuthData(authResponse: AuthResponse): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, authResponse.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, authResponse.refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authResponse.user));
  }

  private clearAuthData(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  private handleError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error('An unexpected error occurred');
  }
}