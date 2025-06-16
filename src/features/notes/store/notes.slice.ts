import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { CreateNoteRequest, GetNotesParams, NotesState, UpdateNoteRequest } from '../types/note.types';
import type { INoteService } from '../services/note.service';

let noteService: INoteService;

export const setNoteService = (service: INoteService) => {
  noteService = service;
};

export const fetchNotesAsync = createAsyncThunk(
  'notes/fetchNotes',
  async (params: GetNotesParams = {}, { rejectWithValue }) => {
    try {
      return await noteService.getNotes(params);
    } catch (error: unknown) {
      let message = 'Failed to fetch notes';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      return rejectWithValue(message);
    }
  }
);

export const fetchNoteAsync = createAsyncThunk(
  'notes/fetchNote',
  async (id: string, { rejectWithValue }) => {
    try {
      return await noteService.getNote(id);
    } catch (error: unknown) {
      let message = 'Failed to fetch note';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      return rejectWithValue(message);
    }
  }
);

export const createNoteAsync = createAsyncThunk(
  'notes/createNote',
  async (data: CreateNoteRequest, { rejectWithValue }) => {
    try {
      return await noteService.createNote(data);
    } catch (error: unknown) {
      let message = 'Failed to create note';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      return rejectWithValue(message);
    }
  }
);

export const updateNoteAsync = createAsyncThunk(
  'notes/updateNote',
  async ({ id, data }: { id: string; data: UpdateNoteRequest }, { rejectWithValue }) => {
    try {
      return await noteService.updateNote(id, data);
    } catch (error: unknown) {
      let message = 'Failed to update note';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      return rejectWithValue(message);
    }
  }
);

export const deleteNoteAsync = createAsyncThunk(
  'notes/deleteNote',
  async (id: string, { rejectWithValue }) => {
    try {
      await noteService.deleteNote(id);
      return id;
    } catch (error: unknown) {
      let message = 'Failed to delete note';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      return rejectWithValue(message);
    }
  }
);

const initialState: NotesState = {
  notes: [],
  currentNote: null,
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0,
  },
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentNote: (state) => {
      state.currentNote = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notes
      .addCase(fetchNotesAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload.items;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
        };
      })
      .addCase(fetchNotesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch single note
      .addCase(fetchNoteAsync.fulfilled, (state, action) => {
        state.currentNote = action.payload;
      })
      // Create note
      .addCase(createNoteAsync.fulfilled, (state, action) => {
        state.notes.unshift(action.payload);
      })
      // Update note
      .addCase(updateNoteAsync.fulfilled, (state, action) => {
        const index = state.notes.findIndex(note => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
        if (state.currentNote?.id === action.payload.id) {
          state.currentNote = action.payload;
        }
      })
      // Delete note
      .addCase(deleteNoteAsync.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note.id !== action.payload);
        if (state.currentNote?.id === action.payload) {
          state.currentNote = null;
        }
      });
  },
});

export const { clearError, clearCurrentNote } = notesSlice.actions;
export default notesSlice.reducer;