import { IAuthRepository } from './interfaces/IAuthRepository';
import { AuthRepository } from './implementations/AuthRepository';
import { INoteRepository } from './interfaces/INoteRepository';
import { NoteRepository } from './implementations/NoteRepository';

export class RepositoryFactory {
  private static authRepository: IAuthRepository;
  private static noteRepository: INoteRepository;

  static getAuthRepository(): IAuthRepository {
    if (!this.authRepository) {
      this.authRepository = new AuthRepository();
    }
    return this.authRepository;
  }

  static getNoteRepository(): INoteRepository {
    if (!this.noteRepository) {
      this.noteRepository = new NoteRepository();
    }
    return this.noteRepository;
  }
}