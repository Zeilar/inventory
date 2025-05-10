import type { SettingsValues } from "@/features/db/schema";
import { createContext, useContext, useMemo, type ReactNode } from "react";

type SettingsContextValues = SettingsValues;

interface SettingsProps {
  children: ReactNode;
  settings: SettingsValues;
}

export const SettingsContext = createContext<SettingsContextValues | undefined>(undefined);

export function SettingsProvider({ children, settings }: SettingsProps) {
  const values = useMemo<SettingsValues>(() => settings, [settings]);

  return <SettingsContext.Provider value={values}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValues {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider.");
  }
  return context;
}
