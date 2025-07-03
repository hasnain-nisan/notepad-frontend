import { CreateNoteHeaderProps } from "@/types/note.types";
import { ArrowBack, Preview, Save } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";

export default function CreateNoteHeader({
  onBack,
  isPreviewMode,
  onTogglePreview,
  onSave,
}: CreateNoteHeaderProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
      <IconButton onClick={onBack} sx={{ mr: 2 }}>
        <ArrowBack />
      </IconButton>
      <Typography
        variant="h4"
        component="h1"
        fontWeight={600}
        sx={{ flexGrow: 1 }}
      >
        Create New Note
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<Preview />}
          onClick={onTogglePreview}
        >
          {isPreviewMode ? "Edit" : "Preview"}
        </Button>
        <Button variant="contained" startIcon={<Save />} onClick={onSave}>
          Save Note
        </Button>
      </Box>
    </Box>
  );
}
