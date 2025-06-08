"use client";

import { MenuItem, Select } from "@mui/material";
import { useRouter } from "next/navigation";

interface VersionSelectProps {
  value?: string;
  options: string[]; // Should be `createdAt` column.
}

export function VersionSelect({ options, value }: VersionSelectProps) {
  const { push } = useRouter();

  return (
    <Select
      label="Version"
      size="small"
      value={value || "current"}
      renderValue={(value) => (value === "current" ? "Current" : value)}
      onChange={(e) => push(`?version=${e.target.value}`)}
      disabled={options.length === 0}
    >
      <MenuItem value="current">Current</MenuItem>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
