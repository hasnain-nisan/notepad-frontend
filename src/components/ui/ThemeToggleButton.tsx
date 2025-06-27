"use client";

import { IconButton, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleTheme } from "@/store/slices/themeSlice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ThemeToggleButton() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
      <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
        {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
}
