import type { IHttpService } from '../../../shared/services/http.service';
import type { ApiResponse } from '../../../shared/types/common.types';
import type { CreateNoteRequest, GetNotesParams, Note, UpdateNoteRequest } from '../types/note.types';
import type { INoteRepository } from './note.repository.interface';

export class NoteRepository implements INoteRepository {
  private httpService: IHttpService;

  constructor(httpService: IHttpService) {
    this.httpService = httpService;
  }

  async findAll(): Promise<Note[]> {
    const response = await this.httpService.get<ApiResponse<Note[]>>('/notes');
    return response.data;
  }

  async findPaginated(params: GetNotesParams): Promise<{
    items: Note[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);

    const response = await this.httpService.get<ApiResponse<{
      items: Note[];
      total: number;
      currentPage: number;
      totalPages: number;
    }>>(`/notes?${queryParams.toString()}`);
    
    return response.data;
  }

  async findById(id: string): Promise<Note> {
    const response = await this.httpService.get<ApiResponse<Note>>(`/notes/${id}`);
    return response.data;
  }

  async create(data: CreateNoteRequest): Promise<Note> {
    const response = await this.httpService.post<ApiResponse<Note>>('/notes', data);
    return response.data;
  }

  async update(id: string, data: UpdateNoteRequest): Promise<Note> {
    const response = await this.httpService.patch<ApiResponse<Note>>(`/notes/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await this.httpService.delete(`/notes/${id}`);
  }
}