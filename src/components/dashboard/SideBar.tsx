"use client"

import type React from "react"
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Avatar,
} from "@mui/material"
import { Dashboard, Analytics, People, Inventory, ShoppingCart, Settings } from "@mui/icons-material"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { DRAWER_WIDTH, NAVIGATION_ITEMS } from "@/libs/constants"

const iconMap = {
  dashboard: Dashboard,
  analytics: Analytics,
  people: People,
  inventory: Inventory,
  shopping_cart: ShoppingCart,
  settings: Settings,
}

export const SideBar: React.FC = () => {
  const pathname = usePathname()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          bgcolor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      {/* Logo/Brand Section */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 40,
            height: 40,
          }}
        >
          <Dashboard />
        </Avatar>
        <Typography variant="h6" component="div" fontWeight={600}>
          Dashboard
        </Typography>
      </Box>

      <Divider />

      {/* User Profile Section */}
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
          <Avatar
            sx={{
              bgcolor: "secondary.main",
              width: 36,
              height: 36,
            }}
          >
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

      <Divider />

      {/* Navigation Items */}
      <List sx={{ px: 2, py: 1 }}>
        {NAVIGATION_ITEMS.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap]
          const isActive = pathname === item.path

          return (
            <ListItem key={item.title} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  bgcolor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "primary.contrastText" : "text.primary",
                  "&:hover": {
                    bgcolor: isActive ? "primary.dark" : "action.hover",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "primary.contrastText" : "text.secondary",
                    minWidth: 40,
                  }}
                >
                  <IconComponent />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}
