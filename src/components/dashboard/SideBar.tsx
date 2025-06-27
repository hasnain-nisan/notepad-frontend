import { DRAWER_WIDTH } from "@/libs/constants";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Link from "next/link";

export function SideBar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem component={Link} href="/dashboard">
            <ListItemText primary="Dashboard Home" />
          </ListItem>
          <ListItem component={Link} href="/dashboard/notes">
            <ListItemText primary="Notes" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
