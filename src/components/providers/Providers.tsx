"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { SessionProvider } from "next-auth/react";
import { ProvidersProps } from "@/types/util.types";
import { MainThemeProvider } from "./MainThemeProvider";
import { useHasMounted } from "@/hooks/useHasMounted";
export default function Providers({ children }: ProvidersProps) {
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;

  return (
    <SessionProvider>
      <Provider store={store}>
        <MainThemeProvider>{children}</MainThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
