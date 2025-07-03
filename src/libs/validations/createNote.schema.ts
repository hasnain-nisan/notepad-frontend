import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(1, "Content cannot be empty"),
  color: z
    .string()
    .regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "Must be a valid hex color"),
  coverImage: z.string().optional(),
  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .min(1, "At least one tag is required"),
});

export type CreateNoteFormData = z.infer<typeof createNoteSchema>;
