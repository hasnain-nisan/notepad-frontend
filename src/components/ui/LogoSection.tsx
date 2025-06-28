"use client";

import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

export const LogoSection: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        px: 3,
        py: 2,
      }}
    >
      <Avatar
        sx={{
          bgcolor: "primary.main",
          width: 40,
          height: 40,
        }}
      >
        <NoteAltIcon sx={{ color: "primary.contrastText" }} />
      </Avatar>
      <Typography
        variant="h5"
        component="div"
        fontWeight={600}
        sx={{
          fontFamily: "monospace",
          color: "text.primary",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Whisp
      </Typography>
    </Box>
  );
};
