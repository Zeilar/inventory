"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { theme } from "@/features/theme";
import { QueryClientProvider, QueryClient } from "react-query";
import { CustomSnackbarProvider } from "./snackbar";
import { ProgressProvider } from "@bprogress/next/app";

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  return (
    <ProgressProvider
      height="4px"
      options={{ showSpinner: false }}
      shallowRouting
      color={theme.palette.primary.main}
    >
      <AppRouterCacheProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <CustomSnackbarProvider />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </AppRouterCacheProvider>
    </ProgressProvider>
  );
}
