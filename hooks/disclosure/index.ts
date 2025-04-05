"use client";

import { useCallback, useMemo, useState } from "react";

export interface DisclosureSetters {
  open(): void;
  close(): void;
  toggle(): void;
}

export type Disclosure = [boolean, DisclosureSetters];

export function useDisclosure(initialIsOpen = false): Disclosure {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((p) => !p), []);

  const setters = useMemo<DisclosureSetters>(
    () => ({
      toggle,
      open,
      close,
    }),
    [close, open, toggle]
  );

  return [isOpen, setters];
}
