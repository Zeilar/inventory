"use client";

import { Home, Inventory2, Warehouse } from "@mui/icons-material";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import { Navlink } from "./navlink";

export function Sidebar() {
  const pathname = usePathname();
  const { spacing } = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height={`calc(100svh - ${spacing(8)})`}
      position="sticky"
      top={spacing(4)}
      gap={0.75}
      pr={3}
      py={3}
      borderRight="1px solid"
      borderColor="divider"
      flexShrink={0}
    >
      <Typography
        fontWeight={600}
        variant="h5"
        display="flex"
        alignItems="center"
        gap={1.5}
        px={1.5}
        pb={1.5}
      >
        <Inventory2 color="primary" />
        Inventory
      </Typography>
      <Divider sx={{ my: 0.75 }} />
      <Navlink href="/" icon={Home} isActive={pathname === "/"} label="Overview" />
      <Navlink href="/items" icon={Warehouse} isActive={pathname === "/items"} label="Items" />
    </Box>
  );
}
