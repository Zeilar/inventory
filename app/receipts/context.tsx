"use client";

import {
  createContext,
  useContext,
  useMemo,
  useTransition,
  type PropsWithChildren,
  type TransitionStartFunction,
} from "react";

interface ReceiptsPageContext {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

export const ReceiptsPageContext = createContext<ReceiptsPageContext | undefined>(undefined);

export function ReceiptsPageProvider({ children }: PropsWithChildren) {
  const [isLoading, startTransition] = useTransition();
  const values = useMemo<ReceiptsPageContext>(() => ({ isLoading, startTransition }), [isLoading]);

  return <ReceiptsPageContext.Provider value={values}>{children}</ReceiptsPageContext.Provider>;
}

export function useReceiptsPageContext(): ReceiptsPageContext {
  const context = useContext(ReceiptsPageContext);
  if (!context) {
    console.warn("`useReceiptsPageContext` must be used within a `ReceiptsPageProvider`.");
  }
  return (
    context ?? {
      isLoading: false,
      startTransition: () => {
        console.warn("`startTransition` was used without a `ReceiptsPageContext`.");
      },
    }
  );
}
