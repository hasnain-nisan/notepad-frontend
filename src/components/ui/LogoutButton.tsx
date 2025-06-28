"use client";

import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Button
      variant="contained"
      color="error" // MUI uses theme.palette.error.main
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      sx={{ textTransform: "none", width: "100%" }}
    >
      Logout
    </Button>
  );
};
