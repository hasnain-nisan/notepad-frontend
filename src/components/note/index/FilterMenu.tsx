"use client";

import { FilterMenuProps } from "@/types/note.types";
import { Box, Menu, MenuItem } from "@mui/material";
import { SortByAlpha, CalendarToday, Update } from "@mui/icons-material";

export default function FilterMenu({
  anchorEl,
  open,
  onClose,
  onSortChange,
}: FilterMenuProps) {
  const handleSortChange = (sortBy: string) => {
    onSortChange(sortBy);
    onClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={() => handleSortChange("updatedAt")}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Update fontSize="small" />
          Sort by Last Modified
        </Box>
      </MenuItem>
      <MenuItem onClick={() => handleSortChange("createdAt")}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarToday fontSize="small" />
          Sort by Date Created
        </Box>
      </MenuItem>
      <MenuItem onClick={() => handleSortChange("title")}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SortByAlpha fontSize="small" />
          Sort by Title
        </Box>
      </MenuItem>
    </Menu>
  );
}
