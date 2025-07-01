"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import NotesHeader from "@/components/note/index/NotesHeader";
import NotesGrid from "@/components/note/index/NotesGrid";
import EmptyState from "@/components/note/index/EmptyState";
import FilterMenu from "@/components/note/index/FilterMenu";
import NoteActionsMenu from "@/components/note/index/NoteActionsMenu";
import FloatingActionButton from "@/components/note/index/FloatingActionButton";
import { mockNotes, Note } from "@/types/note.types";
import { useRouter } from "next/navigation";
import { NOTE_ROUTES } from "@/libs/constants";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function NotesContainer() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [noteMenuAnchor, setNoteMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  // Filter and search logic
  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "All" || note.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "updatedAt")
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      if (sortBy === "createdAt")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleNoteMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    noteId: number
  ) => {
    event.stopPropagation();
    setNoteMenuAnchor(event.currentTarget);
    setSelectedNoteId(noteId);
  };

  const handleMenuClose = () => {
    setFilterMenuAnchor(null);
    setNoteMenuAnchor(null);
    setSelectedNoteId(null);
  };

  const toggleFavorite = (noteId: number) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

  const handleCreateNote = () => {
    router.push(NOTE_ROUTES.CREATE);
  };

  return (
    <Box
      component="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding={isMobile ? 0 : 2}
    >
      <Box>
        <NotesHeader
          notes={notes}
          filteredNotes={filteredNotes}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onFilterMenuOpen={handleFilterMenuOpen}
        />

        {filteredNotes.length > 0 ? (
          <NotesGrid
            notes={filteredNotes}
            onToggleFavorite={toggleFavorite}
            onNoteMenuOpen={handleNoteMenuOpen}
          />
        ) : (
          <EmptyState
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onCreateNote={handleCreateNote}
          />
        )}

        <FloatingActionButton onClick={handleCreateNote} />

        <FilterMenu
          anchorEl={filterMenuAnchor}
          open={Boolean(filterMenuAnchor)}
          onClose={handleMenuClose}
          onSortChange={handleSortChange}
        />

        <NoteActionsMenu
          anchorEl={noteMenuAnchor}
          open={Boolean(noteMenuAnchor)}
          onClose={handleMenuClose}
          selectedNoteId={selectedNoteId}
        />
      </Box>
    </Box>
  );
}
