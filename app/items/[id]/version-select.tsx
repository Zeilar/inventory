"use client";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/navigation";

interface VersionSelectProps {
  value?: string;
  options: string[]; // Should be `createdAt` column.
}

function renderItem(value: string): string {
  return new Date(value).toLocaleString(process.env.NEXT_PUBLIC_LOCALE);
}

export function VersionSelect({ options, value }: VersionSelectProps) {
  const { push } = useRouter();

  return (
    <FormControl sx={{ width: 205 }} size="small">
      <InputLabel>Version</InputLabel>
      <Select
        label="Version"
        size="small"
        value={value || "current"}
        renderValue={(value) => (value === "current" ? "Current" : renderItem(value))}
        onChange={(e) => push(`?version=${e.target.value}`)}
        disabled={options.length === 0}
      >
        <MenuItem value="current">Current</MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {renderItem(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
