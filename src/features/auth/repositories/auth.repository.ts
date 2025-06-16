import type { IHttpService } from "../../../shared/services/http.service";
import type { ApiResponse } from "../../../shared/types/common.types";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth.types";
import type { IAuthRepository } from "./auth.repository.interface";

// Single Responsibility Principle - Handle auth API calls
export class AuthRepository implements IAuthRepository {
  private httpService: IHttpService;

  constructor(httpService: IHttpService) {
    this.httpService = httpService;
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.httpService.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials
    );
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await this.httpService.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      userData
    );
    return response.data;
  }
}