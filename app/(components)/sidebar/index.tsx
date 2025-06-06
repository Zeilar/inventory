"use client";

import { Home, Inventory2, Settings, Warehouse } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { Navlink } from "./navlink";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Box borderRight="1px solid" borderColor="divider">
      <Box position="sticky" top={0} p={3} display="flex" flexDirection="column" gap={1.5}>
        <Typography
          fontWeight={600}
          variant="h5"
          display="flex"
          alignItems="center"
          gap={1.5}
          mb={0.75}
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
    </Box>
  );
}
