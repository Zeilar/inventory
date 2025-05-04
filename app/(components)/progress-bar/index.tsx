"use client";

import { theme } from "@/features/theme";
import { AppProgressBar } from "next-nprogress-bar";

export function ProgressBar() {
  return (
    <AppProgressBar
      color={theme.palette.primary.main}
      shallowRouting
      height="4px"
      // options={{ showSpinner: false }}
    />
  );
}
