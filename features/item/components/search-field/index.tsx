"use client";

import { useItemsPageContext } from "@/app/items/context";
import { Clear, Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { type ChangeEventHandler, useCallback, useEffect, useState } from "react";

interface ItemSearchFieldLayoutProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit?: VoidFunction;
  onClear?: VoidFunction;
  isLoading?: boolean;
  search?: string | null;
}

export function ItemSearchFieldLayout({
  onChange,
  onClear,
  onSubmit,
  value,
  isLoading,
  search,
}: ItemSearchFieldLayoutProps) {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      height="100%"
      width={["100%", "auto"]}
    >
      <OutlinedInput
        sx={{ width: ["100%", "auto"] }}
        value={value}
        onChange={onChange}
        size="small"
        placeholder="Cable"
        disabled={isLoading}
        startAdornment={
          <InputAdornment position="start">
            <Search color="disabled" />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment
            position="end"
            sx={{ cursor: "pointer", opacity: value?.trim() || search ? 1 : 0 }}
            onClick={onClear}
          >
            <IconButton size="small">
              <Clear fontSize="small" />
            </IconButton>
          </InputAdornment>
        }
      />
    </Box>
  );
}

export function ItemSearchField() {
  const { isLoading, startTransition } = useItemsPageContext();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim() ?? "";
  const [value, setValue] = useState<string>(search);
  const onSubmit = useCallback(
    (v?: string) => {
      if (typeof window === "undefined") {
        return;
      }
      const search = v ?? value.trim();
      if (!search) {
        return;
      }
      const _searchParams = new URLSearchParams(searchParams);
      _searchParams.set("search", search);
      _searchParams.delete("page"); // Always reset to page 1 when searching to avoid empty result.
      startTransition(() => push(search ? `?${_searchParams}` : window.location.pathname));
    },
    [value, searchParams, push, startTransition]
  );

  useEffect(() => {
    setValue(search);
  }, [searchParams, search]);

  return (
    <ItemSearchFieldLayout
      isLoading={isLoading}
      onChange={(e) => setValue(e.target.value)}
      onSubmit={onSubmit}
      value={value}
      onClear={() => {
        onSubmit("");
        setValue("");
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("search");
        push(`/items?${newSearchParams}`);
      }}
      search={search}
    />
  );
}
