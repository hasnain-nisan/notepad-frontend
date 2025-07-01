"use client";

import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export default function FloatingActionButton({
  onClick,
}: FloatingActionButtonProps) {
  return (
    <Fab
      color="primary"
      aria-label="add note"
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        display: { xs: "flex", sm: "none" },
      }}
    >
      <Add />
    </Fab>
  );
}
