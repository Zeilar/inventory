"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useTransition,
  type PropsWithChildren,
  type TransitionStartFunction,
} from "react";

interface ItemsPageContext {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  checked: number[];
  onCheck(id: number): void;
}

export const ItemsPageContext = createContext<ItemsPageContext | undefined>(undefined);

export function ItemsPageProvider({ children }: PropsWithChildren) {
  const [isLoading, startTransition] = useTransition();
  const [checked, setChecked] = useState<number[]>([]);
  const values = useMemo<ItemsPageContext>(
    () => ({
      isLoading,
      startTransition,
      checked,
      onCheck: (id) =>
        setChecked((p) => (!p.includes(id) ? [...p, id] : p.filter((element) => element !== id))),
    }),
    [isLoading, checked]
  );

  return <ItemsPageContext.Provider value={values}>{children}</ItemsPageContext.Provider>;
}

export function useItemsPageContext(): ItemsPageContext {
  const context = useContext(ItemsPageContext);
  if (!context) {
    throw new Error("`useItemsPageContext` must be used within a `ItemsPageProvider`.");
  }
  return context;
}
