"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { theme } from "@/features/theme";
import { QueryClientProvider, QueryClient } from "react-query";
import { CustomSnackbarProvider } from "./snackbar";
import { ProgressProvider } from "@bprogress/next/app";
import { SettingsProvider } from "./settings";
import type { SettingsValues } from "@/features/db/schema";

interface ProvidersProps extends PropsWithChildren {
  settings: SettingsValues;
}

const queryClient = new QueryClient();

export function Providers({ children, settings }: ProvidersProps) {
  return (
    <ProgressProvider
      height="4px"
      options={{ showSpinner: false }}
      shallowRouting
      color={theme.palette.primary.main}
    >
      <AppRouterCacheProvider>
        <QueryClientProvider client={queryClient}>
          <SettingsProvider settings={settings}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <CustomSnackbarProvider />
              {children}
            </ThemeProvider>
          </SettingsProvider>
        </QueryClientProvider>
      </AppRouterCacheProvider>
    </ProgressProvider>
  );
}
