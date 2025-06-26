import { IAuthRepository } from "../interfaces/IAuthRepository";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "@/types/auth.types";
import { ApiResponse, ApiError } from "@/types/api.types";
import { API_BASE_URL, API_ENDPOINTS } from "@/libs/constants";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";

export class AuthRepository implements IAuthRepository {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      const data: ApiResponse<T> | ApiError = await response.json();

      if (!response.ok) {
        throw new Error((data as ApiError).message || "Request failed");
      }

      return (data as ApiResponse<T>).data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network error occurred");
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>(API_ENDPOINTS.auth.login, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>(API_ENDPOINTS.auth.register, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async refreshToken(
    request: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    return this.makeRequest<RefreshTokenResponse>(API_ENDPOINTS.auth.refresh, {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  async logout(): Promise<void> {
    await signOut({ redirect: false });
  }

  async getCurrentSession(): Promise<Session | null> {
    return await getSession();
  }

  async isAuthenticated(): Promise<boolean> {
    const session = await getSession();
    return !!session;
  }
  async verifyToken(token: string): Promise<boolean> {
    try {
      await this.makeRequest<void>("/auth/verify", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch {
      return false;
    }
  }
}
