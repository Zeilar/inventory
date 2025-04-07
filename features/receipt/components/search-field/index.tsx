"use client";

import { Clear } from "@mui/icons-material";
import { Box, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const inputId = "receipt-search-field";

export function ReceiptSearchField() {
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
      push(search ? `?${_searchParams}` : window.location.pathname);
    },
    [value, searchParams, push]
  );

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      height="100%"
    >
      <FormControl size="small" sx={{ width: 300 }}>
        <InputLabel htmlFor={inputId}>Amount</InputLabel>
        <OutlinedInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id={inputId}
          size="small"
          endAdornment={
            value.trim() && (
              <InputAdornment
                position="start"
                sx={{ mr: 0, ml: 1, cursor: "pointer" }}
                onClick={() => {
                  onSubmit("");
                  setValue("");
                }}
              >
                <Clear />
              </InputAdornment>
            )
          }
          label="Amount"
        />
      </FormControl>
    </Box>
  );
}
