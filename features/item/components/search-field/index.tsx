"use client";

import { useItemsPageContext } from "@/app/items/context";
import { Clear } from "@mui/icons-material";
import { Box, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { type ChangeEventHandler, useCallback, useState } from "react";

interface ItemSearchFieldLayoutProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit?: VoidFunction;
  onClear?: VoidFunction;
  isLoading?: boolean;
}

const inputId = "item-search-field";

export function ItemSearchFieldLayout({
  onChange,
  onClear,
  onSubmit,
  value,
  isLoading,
}: ItemSearchFieldLayoutProps) {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      height="100%"
    >
      <FormControl size="small" sx={{ width: 300 }}>
        <InputLabel htmlFor={inputId}>Search</InputLabel>
        <OutlinedInput
          value={value}
          onChange={onChange}
          id={inputId}
          size="small"
          placeholder="IKEA"
          label="Search"
          disabled={isLoading}
          endAdornment={
            value?.trim() && (
              <InputAdornment
                position="start"
                sx={{ mr: 0, ml: 1, cursor: "pointer" }}
                onClick={onClear}
              >
                <Clear />
              </InputAdornment>
            )
          }
        />
      </FormControl>
    </Box>
  );
}

export function ItemSearchField() {
  const { isLoading, startTransition } = useItemsPageContext();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get("search")?.trim() ?? "");
  const onSubmit = useCallback(
    (v?: string) => {
      if (typeof window === "undefined") {
        return;
      }
      const search = v ?? value.trim();
      const _searchParams = new URLSearchParams(searchParams);
      _searchParams.set("search", search);
      _searchParams.delete("page"); // Always reset to page 1 when searching to avoid empty result.
      startTransition(() => push(search ? `?${_searchParams}` : window.location.pathname));
    },
    [value, searchParams, push, startTransition]
  );

  return (
    <ItemSearchFieldLayout
      isLoading={isLoading}
      onChange={(e) => setValue(e.target.value)}
      onSubmit={onSubmit}
      value={value}
      onClear={() => {
        onSubmit("");
        setValue("");
      }}
    />
  );
}
