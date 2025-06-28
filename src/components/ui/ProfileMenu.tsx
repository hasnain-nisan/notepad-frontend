"use client";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
          JD
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>My Account</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Settings</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
      </Menu>
    </>
  );
};
