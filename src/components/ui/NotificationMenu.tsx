"use client";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import { useState } from "react";

export const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Badge badgeContent={4} color="error">
          <Notifications />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>New user registered</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Order #1234 completed</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>System update available</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>View all notifications</MenuItem>
      </Menu>
    </>
  );
};