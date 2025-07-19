"use client";

import { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { CustomSnackbarProvider } from "./snackbar";
import { ProgressProvider } from "@bprogress/next/app";
import { SettingsProvider } from "./settings";
import type { SettingsValues } from "@/features/db/schema";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "@/components";
import { system } from "@/features/theme";

interface ProvidersProps extends PropsWithChildren {
  settings: SettingsValues;
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function Providers({ children, settings }: ProvidersProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <ProgressProvider
          height="4px"
          options={{ showSpinner: false }}
          shallowRouting
          color="var(--chakra-colors-blue-solid)"
        >
          <QueryClientProvider client={queryClient}>
            <SettingsProvider settings={settings}>
              <CustomSnackbarProvider />
              {children}
            </SettingsProvider>
          </QueryClientProvider>
        </ProgressProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
