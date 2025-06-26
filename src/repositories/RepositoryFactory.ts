import { IAuthRepository } from './interfaces/IAuthRepository';
import { AuthRepository } from './implementations/AuthRepository';

export class RepositoryFactory {
  private static authRepository: IAuthRepository;

  static getAuthRepository(): IAuthRepository {
    if (!this.authRepository) {
      this.authRepository = new AuthRepository();
    }
    return this.authRepository;
  }

  // Future: Add note repository factory method
  // static getNoteRepository(): INoteRepository {
  //   if (!this.noteRepository) {
  //     this.noteRepository = new NoteRepository();
  //   }
  //   return this.noteRepository;
  // }
}