"use client";

import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/libs/constants";
import { ServiceFactory } from "@/services/ServiceFactory";


export const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const authService = ServiceFactory.getAuthService();
    await authService.logout();
    router.push(ROUTES.HOME);
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
