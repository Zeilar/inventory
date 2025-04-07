"use client";

import { Box, TextField } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function ReceiptSearchField() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get("search")?.trim() ?? "");

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        const search = value.trim();
        const _searchParams = new URLSearchParams(searchParams);
        _searchParams.set("search", search);
        _searchParams.delete("page"); // Always reset to page 1 when searching to avoid empty result.
        push(search ? `?${_searchParams}` : window.location.pathname);
      }}
      height="100%"
    >
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="IKEA"
        label="Search"
        size="small"
        sx={{ width: 200, height: "100%" }}
        slotProps={{ input: { sx: { height: "100%" } } }}
      />
    </Box>
  );
}
