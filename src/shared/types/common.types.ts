export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
