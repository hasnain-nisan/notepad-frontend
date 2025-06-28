"use client";

import type React from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { DRAWER_WIDTH } from "@/libs/constants";
import ThemeToggleButton from "../ui/ThemeToggleButton";
import { useIsMobile } from "@/hooks/useIsMobile";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch } from "@/hooks/redux";
import { toggleSidebar } from "@/store/slices/uiSlice";
import { SearchInput } from "../ui/SearchInput";
import { ProfileMenu } from "../ui/ProfileMenu";
import { NotificationMenu } from "../ui/NotificationMenu";

type TopBarProps = object;

export const TopBar: React.FC<TopBarProps> = () => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: isMobile ? "100%" : `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: isMobile ? 0 : `${DRAWER_WIDTH}px`,
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar>
        {/* Search Bar */}
        <SearchInput />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            ml: 2,
          }}
        >
          {/* Notifications */}
          <NotificationMenu />

          {/* Theme Toggle - Replace the IconButton with your component */}
          <ThemeToggleButton />

          {/* Profile */}
          {/* <ProfileMenu/> */}

          {/* mobile menu icon */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => dispatch(toggleSidebar())}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
