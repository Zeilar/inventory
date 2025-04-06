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
        push(search ? `?search=${search}` : window.location.pathname);
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
