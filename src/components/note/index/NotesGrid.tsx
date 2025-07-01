"use client";

import { Grid } from "@mui/material";
import NoteCard from "./NoteCard";
import { Note, NotesGridProps } from "@/types/note.types";

export default function NotesGrid({
  notes,
  onToggleFavorite,
  onNoteMenuOpen,
}: NotesGridProps) {
  return (
    <Grid container spacing={3}>
      {notes.map((note: Note) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={note.id}>
          <NoteCard
            note={note}
            onToggleFavorite={onToggleFavorite}
            onMenuOpen={onNoteMenuOpen}
          />
        </Grid>
      ))}
    </Grid>
  );
}
