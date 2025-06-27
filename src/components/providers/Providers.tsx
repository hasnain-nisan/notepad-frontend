"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from '@/store';
import { SessionProvider } from "next-auth/react";
import { ProvidersProps } from "@/types/util.types";
import { MainThemeProvider } from "./MainThemeProvider";


export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <MainThemeProvider>
          {children}
        </MainThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
