"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Avatar,
} from "@mui/material";
import {
  Add,
  Search,
  FilterList,
  MoreVert,
  Edit,
  Delete,
  Share,
  Favorite,
  FavoriteBorder,
  AccessTime,
} from "@mui/icons-material";

// Mock data for notes
export const mockNotes = [
  {
    id: 1,
    title: "Project Planning Meeting",
    excerpt:
      "Discussed the roadmap for Q2 and assigned tasks to team members. Key decisions made regarding...",
    content: "Full content of the note...",
    coverImage: "https://picsum.photos/seed/project-planning/400/200",
    category: "Work",
    tags: ["meeting", "planning", "Q2"],
    author: "John Doe",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-16",
    isFavorite: true,
    color: "#e3f2fd",
  },
  {
    id: 2,
    title: "Recipe: Homemade Pizza",
    excerpt:
      "A delicious homemade pizza recipe with crispy crust and fresh toppings. Perfect for weekend cooking...",
    content: "Full recipe content...",
    coverImage: "https://picsum.photos/seed/pizza-recipe/400/200",
    category: "Personal",
    tags: ["recipe", "cooking", "pizza"],
    author: "John Doe",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
    isFavorite: false,
    color: "#fff3e0",
  },
  {
    id: 3,
    title: "Book Notes: The Lean Startup",
    excerpt:
      "Key insights from Eric Ries' book about building successful startups through validated learning...",
    content: "Detailed book notes...",
    coverImage: "https://picsum.photos/seed/lean-startup/400/200",
    category: "Learning",
    tags: ["book", "startup", "business"],
    author: "John Doe",
    createdAt: "2024-01-13",
    updatedAt: "2024-01-15",
    isFavorite: true,
    color: "#f3e5f5",
  },
  {
    id: 4,
    title: "Travel Itinerary: Japan 2024",
    excerpt:
      "Complete travel plan for 2-week trip to Japan including cities, accommodations, and must-visit places...",
    content: "Detailed travel itinerary...",
    coverImage: "https://picsum.photos/seed/japan-itinerary/400/200",
    category: "Travel",
    tags: ["travel", "japan", "itinerary"],
    author: "John Doe",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-13",
    isFavorite: false,
    color: "#e8f5e8",
  },
  {
    id: 5,
    title: "Workout Routine",
    excerpt:
      "Weekly workout schedule with exercises, sets, and reps. Focus on strength training and cardio...",
    content: "Detailed workout plan...",
    coverImage: "https://picsum.photos/seed/workout-plan/400/200",
    category: "Health",
    tags: ["fitness", "workout", "health"],
    author: "John Doe",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-12",
    isFavorite: true,
    color: "#fce4ec",
  },
  {
    id: 6,
    title: "Investment Research",
    excerpt:
      "Analysis of potential investment opportunities in tech stocks and market trends for 2024...",
    content: "Investment analysis content...",
    coverImage: "https://picsum.photos/seed/tech-investment/400/200",
    category: "Finance",
    tags: ["investment", "stocks", "finance"],
    author: "John Doe",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-11",
    isFavorite: false,
    color: "#e1f5fe",
  },
];

const categories = [
  "All",
  "Work",
  "Personal",
  "Learning",
  "Travel",
  "Health",
  "Finance",
];

export default function NotesPage() {
  const [notes, setNotes] = useState(mockNotes);
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
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1" fontWeight={600}>
            My Notes
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setCreateDialogOpen(true)}
            sx={{ borderRadius: 3 }}
          >
            Create Note
          </Button>
        </Box>

        {/* Search and Filter Bar */}
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
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
            sx={{ flexGrow: 1, minWidth: 300 }}
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
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton
            onClick={handleFilterMenuOpen}
            sx={{ border: 1, borderColor: "divider" }}
          >
            <FilterList />
          </IconButton>
        </Box>

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {filteredNotes.length} notes found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {notes.filter((note) => note.isFavorite).length} favorites
          </Typography>
        </Box>
      </Box>

      {/* Notes Grid */}
      <Grid container spacing={3}>
        {filteredNotes.map((note) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={note.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                },
                borderLeft: 4,
                borderLeftColor: note.color,
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={note.coverImage}
                alt={note.title}
                sx={{ objectFit: "cover" }}
              />

              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h3"
                    fontWeight={600}
                    sx={{ flexGrow: 1, mr: 1 }}
                  >
                    {note.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(note.id);
                      }}
                    >
                      {note.isFavorite ? (
                        <Favorite color="error" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => handleNoteMenuOpen(e, note.id)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {note.excerpt}
                </Typography>

                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}
                >
                  {note.tags.slice(0, 3).map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.75rem" }}
                    />
                  ))}
                  {note.tags.length > 3 && (
                    <Chip
                      label={`+${note.tags.length - 3}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.75rem" }}
                    />
                  )}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: "0.75rem" }}>
                      {note.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary">
                      {note.author}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AccessTime sx={{ fontSize: 14 }} color="disabled" />
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(note.updatedAt)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
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
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setCreateDialogOpen(true)}
          >
            Create Note
          </Button>
        </Box>
      )}

      {/* Floating Action Button for Mobile */}
      <Fab
        color="primary"
        aria-label="add note"
        onClick={() => setCreateDialogOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: { xs: "flex", sm: "none" },
        }}
      >
        <Add />
      </Fab>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setSortBy("updatedAt");
            handleMenuClose();
          }}
        >
          Sort by Last Modified
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSortBy("createdAt");
            handleMenuClose();
          }}
        >
          Sort by Date Created
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSortBy("title");
            handleMenuClose();
          }}
        >
          Sort by Title
        </MenuItem>
      </Menu>

      {/* Note Actions Menu */}
      <Menu
        anchorEl={noteMenuAnchor}
        open={Boolean(noteMenuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Share sx={{ mr: 1 }} /> Share
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Create Note Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Note</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Note Title"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select label="Category">
                {categories.slice(1).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Content"
              multiline
              rows={6}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Tags (comma separated)"
              variant="outlined"
              placeholder="tag1, tag2, tag3"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => setCreateDialogOpen(false)}
          >
            Create Note
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
