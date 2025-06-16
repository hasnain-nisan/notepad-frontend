// Dependency Inversion Principle - IoC Container
import { httpService } from '../services/http.service';
import { AuthRepository } from '../../features/auth/repositories/auth.repository';
import { AuthService } from '../../features/auth/services/auth.service';
import { NoteRepository } from '../../features/notes/repositories/note.repository';
import { NoteService } from '../../features/notes/services/note.service';
import { setAuthService } from '../../features/auth/store/auth.slice';
import { setNoteService } from '../../features/notes/store/notes.slice';

// Initialize dependencies
const authRepository = new AuthRepository(httpService);
const authService = new AuthService(authRepository);

const noteRepository = new NoteRepository(httpService);
const noteService = new NoteService(noteRepository);

// Inject services into Redux slices
setAuthService(authService);
setNoteService(noteService);

export { authService, noteService };
