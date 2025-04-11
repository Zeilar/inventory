"use client";

import { Home, Receipt } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { usePathname } from "next/navigation";
import { Navlink } from "./navlink";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Paper
      sx={{
        height: "100svh",
        minWidth: 300,
        borderTop: 0,
        borderLeft: 0,
        borderBottom: 0,
        borderRadius: 0,
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        p: 1,
      }}
    >
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
