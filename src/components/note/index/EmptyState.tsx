"use client";

import { Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { EmptyStateProps } from "@/types/note.types";

export default function EmptyState({
  searchTerm,
  selectedCategory,
  onCreateNote,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        px: 2,
      }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No notes found
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {searchTerm || selectedCategory !== "All"
          ? "Try adjusting your search or filter criteria"
          : "Create your first note to get started"}
      </Typography>
      <Button variant="contained" startIcon={<Add />} onClick={onCreateNote}>
        Create Note
      </Button>
    </Box>
  );
}
