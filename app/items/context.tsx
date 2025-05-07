"use client";

import { PER_PAGE } from "@/features/item/config";
import { useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
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
  onCheckAll: VoidFunction;
}

interface ItemsPageProviderProps extends PropsWithChildren {
  itemIds: number[];
}

export const ItemsPageContext = createContext<ItemsPageContext | undefined>(undefined);

export function ItemsPageProvider({ children, itemIds }: ItemsPageProviderProps) {
  const searchParams = useSearchParams();
  const [isLoading, startTransition] = useTransition();
  const [checked, setChecked] = useState<number[]>([]);
  const values = useMemo<ItemsPageContext>(
    () => ({
      isLoading,
      startTransition,
      checked,
      onCheck: (id) =>
        setChecked((p) => (!p.includes(id) ? [...p, id] : p.filter((element) => element !== id))),
      // If one or more is checked, check all. Else uncheck all.
      onCheckAll: () => setChecked((p) => (p.length === PER_PAGE ? [] : itemIds)),
    }),
    [isLoading, checked, itemIds]
  );

  /**
   * Unselect all when changing query params.
   * Otherwise we may have hidden selections that the user cannot uncheck easily.
   */
  useEffect(() => {
    setChecked([]);
  }, [searchParams]);

  return <ItemsPageContext.Provider value={values}>{children}</ItemsPageContext.Provider>;
}

export function useItemsPageContext(): ItemsPageContext {
  const context = useContext(ItemsPageContext);
  if (!context) {
    throw new Error("`useItemsPageContext` must be used within a `ItemsPageProvider`.");
  }
  return context;
}
