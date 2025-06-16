import type { IBaseRepository, IPaginatedRepository } from '../../../shared/repositories/base.repository.interface';
import type { CreateNoteRequest, GetNotesParams, Note, UpdateNoteRequest } from '../types/note.types';

export interface INoteRepository extends 
  IBaseRepository<Note, CreateNoteRequest, UpdateNoteRequest>,
  IPaginatedRepository<Note> {
  findPaginated(params: GetNotesParams): Promise<{
    items: Note[];
    total: number;
    currentPage: number;
    totalPages: number;
  }>;
}