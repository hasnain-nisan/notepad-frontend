import React from "react";
import { Box, Toolbar } from "@mui/material";
import { SideBar } from "@/components/dashboard/SideBar";
import { TopBar } from "@/components/dashboard/TopBar";
import { DRAWER_WIDTH } from "@/libs/constants";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <SideBar />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
