import type { ItemsSearchParams } from "@/app/api/items/route";
import { useCallback } from "react";

export function useShallowPush() {
  return useCallback((param: ItemsSearchParams, value: string): void => {
    // Do not use `useSearchParams` as it doesn't update when using `window.history.pushState`.
    const newSearchParams = new URLSearchParams(window.location.search);
    if (value) {
      newSearchParams.set(param, value);
    } else {
      newSearchParams.delete(param);
    }
    window.history.pushState(null, "", `?${newSearchParams}`);
  }, []);
}
