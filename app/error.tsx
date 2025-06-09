"use client";

import { Typography } from "@mui/material";

interface Props {
  error: unknown;
}

export default function Page({ error }: Props) {
  console.error(error);

  return (
    <Typography variant="h2" color="error">
      500
    </Typography>
  );
}
