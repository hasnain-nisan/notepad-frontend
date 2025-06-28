import { useAppSelector } from "@/hooks/redux";
import { getTheme } from "@/libs/theme";
import { ProvidersProps } from "@/types/util.types";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

export function MainThemeProvider({ children }: ProvidersProps) {
  const mode = useAppSelector((state) => state.ui.mode);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </ThemeProvider>
  );
}
