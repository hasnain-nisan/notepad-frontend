import { ApiResponse, ApiError } from "@/types/api.types";
import { API_BASE_URL } from "@/libs/constants";

export async function makeApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

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