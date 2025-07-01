"use client";

import { Menu, MenuItem } from "@mui/material";
import { Edit, Share, Delete } from "@mui/icons-material";
import { NoteActionsMenuProps } from "@/types/note.types";

export default function NoteActionsMenu({
  anchorEl,
  open,
  onClose,
  selectedNoteId,
}: NoteActionsMenuProps) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={onClose}>
        <Edit sx={{ mr: 1 }} /> Edit
      </MenuItem>
      <MenuItem onClick={onClose}>
        <Share sx={{ mr: 1 }} /> Share
      </MenuItem>
      <MenuItem onClick={onClose} sx={{ color: "error.main" }}>
        <Delete sx={{ mr: 1 }} /> Delete
      </MenuItem>
    </Menu>
  );
}
