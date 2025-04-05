"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { theme } from "@/features/theme";
import { QueryClientProvider, QueryClient } from "react-query";
import { CustomSnackbarProvider } from "./snackbar";

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CustomSnackbarProvider />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </AppRouterCacheProvider>
  );
}
