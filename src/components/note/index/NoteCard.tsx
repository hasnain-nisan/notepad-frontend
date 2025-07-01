"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  AccessTime,
} from "@mui/icons-material";
import { NoteCardProps } from "@/types/note.types";
import { formatDate } from "@/libs/helper";

export default function NoteCard({
  note,
  onToggleFavorite,
  onMenuOpen,
}: NoteCardProps) {
  return (
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
                onToggleFavorite(note.id);
              }}
            >
              {note.isFavorite ? (
                <Favorite color="error" />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>
            <IconButton size="small" onClick={(e) => onMenuOpen(e, note.id)}>
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

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
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
  );
}
