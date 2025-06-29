"use client";

import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

interface LogoSectionProps {
  typographyVariant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2";
}

export const LogoSection: React.FC<LogoSectionProps> = ({
  typographyVariant = "h5",
}) => {
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
        variant={typographyVariant}
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
