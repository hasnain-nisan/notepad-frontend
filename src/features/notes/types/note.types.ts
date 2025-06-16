import type { BaseEntity } from '../../../shared/types/common.types';

export interface Note extends BaseEntity {
  title: string;
  content: string;
  userId: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
}

export interface NotesState {
  notes: Note[];
  currentNote: Note | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
  };
}

export interface GetNotesParams {
  page?: number;
  limit?: number;
  search?: string;
}