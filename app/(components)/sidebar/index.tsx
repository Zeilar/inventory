"use client";

import { Home, Inventory2, Settings, Warehouse } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { Navlink } from "./navlink";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      position="sticky"
      gap={0.75}
      pr={3}
      py={3}
      mb={3}
      borderRight="1px solid"
      borderColor="divider"
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
      <Navlink
        href="/settings"
        icon={Settings}
        isActive={pathname === "/settings"}
        label="Settings"
      />
    </Box>
  );
}
