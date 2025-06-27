import { DRAWER_WIDTH } from "@/libs/constants";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ThemeToggleButton from "../ui/ThemeToggleButton";

export function TopBar() {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, ml: `${DRAWER_WIDTH}px` }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Dashboard
        </Typography>
      </Toolbar>
      <Toolbar>
        <ThemeToggleButton/>
      </Toolbar>
    </AppBar>
  );
}
