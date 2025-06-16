import type { CreateNoteRequest, GetNotesParams, Note, UpdateNoteRequest } from '../types/note.types';
import type { INoteRepository } from '../repositories/note.repository.interface';

export interface INoteService {
  getNotes(params?: GetNotesParams): Promise<{
    items: Note[];
    total: number;
    currentPage: number;
    totalPages: number;
  }>;
  getNote(id: string): Promise<Note>;
  createNote(data: CreateNoteRequest): Promise<Note>;
  updateNote(id: string, data: UpdateNoteRequest): Promise<Note>;
  deleteNote(id: string): Promise<void>;
}

export class NoteService implements INoteService {
  private noteRepository: INoteRepository;

  constructor(noteRepository: INoteRepository) {
    this.noteRepository = noteRepository;
  }

  async getNotes(params: GetNotesParams = {}) {
    return this.noteRepository.findPaginated({
      page: 1,
      limit: 10,
      ...params,
    });
  }

  async getNote(id: string): Promise<Note> {
    return this.noteRepository.findById(id);
  }

  async createNote(data: CreateNoteRequest): Promise<Note> {
    return this.noteRepository.create(data);
  }

  async updateNote(id: string, data: UpdateNoteRequest): Promise<Note> {
    return this.noteRepository.update(id, data);
  }

  async deleteNote(id: string): Promise<void> {
    return this.noteRepository.delete(id);
  }
}