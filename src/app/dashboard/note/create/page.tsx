"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import {
  ArrowBack,
  Save,
  Preview,
  Image as ImageIcon,
  Delete,
  Add,
} from "@mui/icons-material";
import { ChromePicker } from "react-color";
import RichTextEditor from "@/components/note/RichTextEditor";

const categories = [
  "Work",
  "Personal",
  "Learning",
  "Travel",
  "Health",
  "Finance",
];

const predefinedColors = [
  "#e3f2fd", // Light Blue
  "#fff3e0", // Light Orange
  "#f3e5f5", // Light Purple
  "#e8f5e8", // Light Green
  "#fce4ec", // Light Pink
  "#e1f5fe", // Light Cyan
  "#fff8e1", // Light Yellow
  "#f1f8e9", // Light Lime
];

export default function CreateNotePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    color: "#e3f2fd",
    coverImage: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTag();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData((prev) => ({
          ...prev,
          coverImage: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (color: any) => {
    setFormData((prev) => ({
      ...prev,
      color: color.hex,
    }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    const noteData = {
      ...formData,
      tags,
      author: "John Doe",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      isFavorite: false,
      id: Date.now(), // Temporary ID generation
    };

    console.log("Saving note:", noteData);
    // Navigate back to notes list
    router.push("/dashboard/notes");
  };

  const generateExcerpt = (content: string) => {
    // Remove HTML tags and get first 150 characters
    const textContent = content.replace(/<[^>]*>/g, "");
    return textContent.length > 150
      ? textContent.substring(0, 150) + "..."
      : textContent;
  };

  const renderContentPreview = () => {
    if (!formData.content) return "No content yet...";

    try {
      const contentState = JSON.parse(formData.content);
      // Simple text extraction from Draft.js content
      const blocks = contentState.blocks || [];
      return blocks.map((block: any) => block.text).join(" ");
    } catch {
      return "Invalid content format";
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <IconButton onClick={() => router.back()} sx={{ mr: 2 }}>
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
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            {isPreviewMode ? "Edit" : "Preview"}
          </Button>
          <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
            Save Note
          </Button>
        </Box>
      </Box>

      {!isPreviewMode ? (
        <Grid container spacing={4}>
          {/* Left Column - Form Fields */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>

              <TextField
                fullWidth
                label="Note Title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                sx={{ mb: 3 }}
                required
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="subtitle1" gutterBottom>
                Content
              </Typography>
              <Box sx={{ mb: 3 }}>
                <RichTextEditor
                  value={formData.content}
                  onChange={handleContentChange}
                  placeholder="Start writing your note..."
                  minHeight={400}
                />
              </Box>
            </Paper>

            {/* Tags Section */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Tags
              </Typography>

              <Box
                sx={{ display: "flex", gap: 1, mb: 2, alignItems: "center" }}
              >
                <TextField
                  size="small"
                  label="Add tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={handleAddTag}
                  disabled={!newTag.trim()}
                >
                  Add
                </Button>
              </Box>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Right Column - Styling Options */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Cover Image */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Cover Image
              </Typography>

              {imagePreview ? (
                <Box sx={{ position: "relative", mb: 2 }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={imagePreview}
                    alt="Cover preview"
                    sx={{ borderRadius: 1 }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "background.paper",
                      "&:hover": { bgcolor: "background.paper" },
                    }}
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, coverImage: "" }));
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ) : (
                <Box
                  sx={{
                    height: 160,
                    border: "2px dashed",
                    borderColor: "divider",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    cursor: "pointer",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  <Box sx={{ textAlign: "center" }}>
                    <ImageIcon
                      sx={{ fontSize: 48, color: "text.secondary", mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Click to upload cover image
                    </Typography>
                  </Box>
                </Box>
              )}

              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />

              <Button
                fullWidth
                variant="outlined"
                startIcon={<ImageIcon />}
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                {imagePreview ? "Change Image" : "Upload Image"}
              </Button>
            </Paper>

            {/* Color Picker */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Note Color
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Predefined Colors
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  {predefinedColors.map((color) => (
                    <Box
                      key={color}
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: color,
                        borderRadius: 1,
                        cursor: "pointer",
                        border:
                          formData.color === color ? "3px solid" : "1px solid",
                        borderColor:
                          formData.color === color ? "primary.main" : "divider",
                      }}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, color }))
                      }
                    />
                  ))}
                </Box>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => setShowColorPicker(!showColorPicker)}
                sx={{ mb: showColorPicker ? 2 : 0 }}
              >
                Custom Color
              </Button>

              {showColorPicker && (
                <Box sx={{ mt: 2 }}>
                  <ChromePicker
                    color={formData.color}
                    onChange={handleColorChange}
                    disableAlpha
                  />
                </Box>
              )}

              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: formData.color,
                  borderRadius: 1,
                  textAlign: "center",
                }}
              >
                <Typography variant="body2">Preview</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        /* Preview Mode */
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Preview
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Card
            sx={{
              maxWidth: 400,
              mx: "auto",
              mb: 4,
              borderLeft: 4,
              borderLeftColor: formData.color,
            }}
          >
            {formData.coverImage && (
              <CardMedia
                component="img"
                height="200"
                image={formData.coverImage}
                alt={formData.title}
              />
            )}
            <Box sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                {formData.title || "Untitled Note"}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {formData.category && (
                  <Chip label={formData.category} size="small" sx={{ mr: 1 }} />
                )}
                {generateExcerpt(renderContentPreview())}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                {tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Stack>
            </Box>
          </Card>

          <Typography variant="h6" gutterBottom>
            Content
          </Typography>
          <Box
            sx={{ border: 1, borderColor: "divider", borderRadius: 1, p: 2 }}
          >
            <RichTextEditor value={formData.content} readOnly />
          </Box>
        </Paper>
      )}
    </Box>
  );
}
