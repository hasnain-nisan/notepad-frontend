import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  User,
} from '@/types/auth.types';

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(credentials: RegisterCredentials): Promise<AuthResponse>;
  refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
  verifyToken(token: string): Promise<boolean>;
}