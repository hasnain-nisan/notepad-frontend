"use client";

import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import { store } from '@/store';
import { theme } from "@/utils/theme";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";


interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {/* <Provider store={store}> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </ThemeProvider>
      {/* </Provider> */}
    </SessionProvider>
  );
}
