"use client";

import { Home, Inventory2, Receipt } from "@mui/icons-material";
import { Divider, Paper, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { Navlink } from "./navlink";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Paper
      sx={{
        height: "100svh",
        minWidth: 300,
        position: "sticky",
        borderRadius: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        gap: 0.75,
        p: 1.5,
        zIndex: 2,
      }}
    >
      <Typography
        fontWeight={600}
        variant="h5"
        display="flex"
        alignItems="center"
        gap={1.5}
        p={1.5}
      >
        <Inventory2 color="primary" />
        Inventory
      </Typography>
      <Divider sx={{ my: 1.5 }} />
      <Navlink href="/" icon={Home} isActive={pathname === "/"} label="Overview" />
      <Navlink
        href="/receipts"
        icon={Receipt}
        isActive={pathname === "/receipts"}
        label="Receipts"
      />
    </Paper>
  );
}
