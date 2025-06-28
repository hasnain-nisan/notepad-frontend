"use client";

import React from "react";
import {
  Drawer,
  List,
  Box,
  Avatar,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Dashboard,
  Analytics,
  People,
  Inventory,
  ShoppingCart,
  Settings,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { DRAWER_WIDTH, NAVIGATION_ITEMS } from "@/libs/constants";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSidebarOpen } from "@/store/slices/uiSlice";
import { LogoSection } from "../ui/LogoSection";

const iconMap = {
  dashboard: Dashboard,
  analytics: Analytics,
  people: People,
  inventory: Inventory,
  shopping_cart: ShoppingCart,
  settings: Settings,
};

export const SideBar: React.FC = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);

  const handleClose = () => {
    dispatch(setSidebarOpen(false));
  };

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box>
        {/* Logo / Branding */}
        <LogoSection/>

        <Divider />

        {/* Navigation Items */}
        <List sx={{ px: 2, py: 1 }}>
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const isActive = pathname === item.path;

            return (
              <ListItem key={item.title} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  onClick={() => isMobile && handleClose()}
                  sx={{
                    borderRadius: 2,
                    py: 1,
                    bgcolor: isActive ? "primary.main" : "transparent",
                    color: isActive ? "primary.contrastText" : "text.primary",
                    "&:hover": {
                      bgcolor: isActive ? "primary.dark" : "action.hover",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive
                        ? "primary.contrastText"
                        : "text.secondary",
                      minWidth: 40,
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            bgcolor: "action.hover",
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main", width: 36, height: 36 }}>
            JD
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              John Doe
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Administrator
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        open={isMobile ? isSidebarOpen : true}
        onClose={handleClose}
        variant={isMobile ? "temporary" : "permanent"}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderRight: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};
