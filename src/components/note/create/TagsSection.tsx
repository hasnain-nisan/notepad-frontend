"use client";

import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import Tags from "@yaireo/tagify/dist/react.tagify"; // Tagify React wrapper
import "@yaireo/tagify/dist/tagify.css";

interface TagsSectionProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export default function TagsSection({ tags, onTagsChange }: TagsSectionProps) {
  const tagifyRef = React.useRef<any>();

  const handleChange = (e: CustomEvent) => {
    const newTags = e.detail.value
      ? JSON.parse(e.detail.value).map((tag: any) => tag.value)
      : [];
    onTagsChange(newTags);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Tags
      </Typography>

      <Box>
        <Tags
          tagifyRef={tagifyRef}
          settings={{
            whitelist: [],
            placeholder: "Add tags...",
            dropdown: {
              enabled: 0,
            },
          }}
          value={tags}
          onChange={handleChange}
        />
      </Box>
    </Paper>
  );
}
