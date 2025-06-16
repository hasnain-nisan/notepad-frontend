// Interface Segregation Principle - Small, focused interfaces
export interface IBaseRepository<T, CreateDto, UpdateDto> {
  findAll(params?: Record<string, unknown>): Promise<T[]>;
  findById(id: string): Promise<T>;
  create(data: CreateDto): Promise<T>;
  update(id: string, data: UpdateDto): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface IPaginatedRepository<T> {
  findPaginated(params: Record<string, unknown>): Promise<{
    items: T[];
    total: number;
    currentPage: number;
    totalPages: number;
  }>;
}