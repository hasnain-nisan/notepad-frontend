"use client";

import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Add,
  Search,
  FilterList,
  NoteOutlined,
  WorkOutline,
  PersonOutline,
  SchoolOutlined,
  FlightTakeoff,
  FavoriteBorder,
  AttachMoney,
  FolderOpen,
  Notes as NotesIcon,
  Code,
} from "@mui/icons-material";
import Link from "next/link";
import { NOTE_ROUTES } from "@/libs/constants";
import { categories, NotesHeaderProps } from "@/types/note.types";

const categoryIcons: { [key: string]: React.ReactNode } = {
  All: <FolderOpen sx={{ mr: 1 }} />,
  Work: <WorkOutline sx={{ mr: 1 }} />,
  Personal: <PersonOutline sx={{ mr: 1 }} />,
  Learning: <SchoolOutlined sx={{ mr: 1 }} />,
  Travel: <FlightTakeoff sx={{ mr: 1 }} />,
  Health: <FavoriteBorder sx={{ mr: 1 }} />,
  Finance: <AttachMoney sx={{ mr: 1 }} />,
  Programming: <Code sx={{ mr: 1 }} />,
};

export default function NotesHeader({
  notes,
  filteredNotes,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onFilterMenuOpen,
}: NotesHeaderProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "nowrap",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight={600}
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 2,
            fontSize: { xs: "1.5rem", sm: "2rem" }
          }}
        >
          <NoteOutlined color="primary" />
          My Notes
        </Typography>

        <Link href={NOTE_ROUTES.CREATE} passHref legacyBehavior>
          <Button
            component="a"
            variant="contained"
            startIcon={<Add />}
            sx={{ 
              borderRadius: 3,
              minWidth: "fit-content"
            }}
          >
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              Create Note
            </Box>
            <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
              Create
            </Box>
          </Button>
        </Link>
      </Box>

      {/* Desktop Layout - Single Row */}
      <Box 
        sx={{ 
          display: { xs: "none", md: "flex" },
          gap: 2, 
          mb: 3,
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ 
            flexGrow: 1,
            minWidth: 300
          }}
        />

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {categoryIcons[category]}
                  {category}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton
          onClick={onFilterMenuOpen}
          sx={{ 
            border: 1, 
            borderColor: "divider",
            width: 48,
            height: 48
          }}
        >
          <FilterList />
        </IconButton>
      </Box>

      {/* Mobile/Tablet Layout - Two Rows */}
      <Box sx={{ display: { xs: "block", md: "none" }, mb: 3 }}>
        {/* First Row - Search Input */}
        <Box sx={{ mb: 2 }}>
          <TextField
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ 
              width: "100%",
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.875rem", sm: "1rem" }
              }
            }}
          />
        </Box>

        {/* Second Row - Category and Filter */}
        <Box 
          sx={{ 
            display: "flex",
            gap: 1.5,
            alignItems: "center"
          }}
        >
          <FormControl 
            sx={{ 
              flex: 1,
              minWidth: 0
            }}
          >
            <InputLabel sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
              Category
            </InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{
                "& .MuiSelect-select": {
                  fontSize: { xs: "0.875rem", sm: "1rem" }
                }
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {categoryIcons[category]}
                    <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                      {category}
                    </Box>
                    <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                      {category.length > 6 ? category.substring(0, 6) + "..." : category}
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton
            onClick={onFilterMenuOpen}
            sx={{ 
              border: 1, 
              borderColor: "divider",
              flexShrink: 0,
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 }
            }}
          >
            <FilterList fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box 
        sx={{ 
          display: "flex", 
          gap: { xs: 2, sm: 3 }, 
          mb: 2,
          flexWrap: "wrap"
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 0.5,
            fontSize: { xs: "0.75rem", sm: "0.875rem" }
          }}
        >
          <NotesIcon fontSize="small" /> {filteredNotes.length} notes found
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 0.5,
            fontSize: { xs: "0.75rem", sm: "0.875rem" }
          }}
        >
          <FavoriteBorder fontSize="small" />{" "}
          {notes.filter((note) => note.isFavorite).length} favorites
        </Typography>
      </Box>
    </Box>
  );
}