import React from "react";
import { Controller } from "react-hook-form";
import { categories, NoteFormProps } from "@/types/note.types";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  FormHelperText,
} from "@mui/material";
import RichTextEditor from "./RichTextEditor";
import { categoryIcons } from "../index/NotesHeader";

export default function NoteForm({ control, errors }: NoteFormProps) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>

      <Controller
        name="title"
        control={control}
        rules={{ required: "Title is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Note Title"
            sx={{ mb: 3 }}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.category}>
            <InputLabel>Category</InputLabel>
            <Select {...field} label="Category">
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {categoryIcons[category]}
                    {category}
                  </Box>
                </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <FormHelperText>{errors.category.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Typography variant="subtitle1" gutterBottom>
        Content
      </Typography>
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.content}>
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              placeholder="Start writing your note..."
              minHeight={400}
              error={!!errors.content}
            />
            {errors.content && (
              <FormHelperText>{errors.content.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Paper>
  );
}
