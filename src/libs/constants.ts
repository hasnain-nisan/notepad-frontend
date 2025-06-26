import { ApiEndpoints } from "@/types/api.types";


export const API_BASE_URL = process.env.BACKEND_URL || "http://localhost:3001";

export const API_ENDPOINTS: ApiEndpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    profile: "/auth/profile",
  },
  notes: {
    getAll: "/notes",
    getById: (id: string) => `/notes/${id}`,
    create: "/notes",
    update: (id: string) => `/notes/${id}`,
    delete: (id: string) => `/notes/${id}`,
  },
};

export const ROUTES = {
  HOME: "/",
  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  DASHBOARD: "/dashboard",
  NOTES: "/notes",
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER: "user",
} as const;
