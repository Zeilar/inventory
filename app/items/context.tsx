"use client";

import {
  createContext,
  useContext,
  useMemo,
  useTransition,
  type PropsWithChildren,
  type TransitionStartFunction,
} from "react";

interface ItemsPageContext {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

export const ItemsPageContext = createContext<ItemsPageContext | undefined>(undefined);

export function ItemsPageProvider({ children }: PropsWithChildren) {
  const [isLoading, startTransition] = useTransition();
  const values = useMemo<ItemsPageContext>(() => ({ isLoading, startTransition }), [isLoading]);

  return <ItemsPageContext.Provider value={values}>{children}</ItemsPageContext.Provider>;
}

export function useItemsPageContext(): ItemsPageContext {
  const context = useContext(ItemsPageContext);
  if (!context) {
    throw new Error("`useItemsPageContext` must be used within a `ItemsPageProvider`.");
  }
  return context;
}
