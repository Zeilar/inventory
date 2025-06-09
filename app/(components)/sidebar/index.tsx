"use client";

import {
  Home,
  HomeOutlined,
  Inventory2,
  Settings,
  SettingsOutlined,
  Warehouse,
  WarehouseOutlined,
} from "@mui/icons-material";
import { AppBar, Box, Divider, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { AppBarNavlink, DesktopNavlink } from "./navlink";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop. */}
      <Box display={["none", "contents"]}>
        <Box
          position="sticky"
          top={0}
          p={3}
          display="flex"
          flexDirection="column"
          gap={0.75}
          borderRight="1px solid"
          borderColor="divider"
        >
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
          <DesktopNavlink href="/" icon={Home} isActive={pathname === "/"} label="Overview" />
          <DesktopNavlink
            href="/items"
            icon={Warehouse}
            isActive={pathname === "/items"}
            label="Items"
          />
          <DesktopNavlink
            href="/settings"
            icon={Settings}
            isActive={pathname === "/settings"}
            label="Settings"
          />
        </Box>
      </Box>

      {/* Mobile. */}
      <Box display={["contents", "none"]} borderRight="1px solid" borderColor="divider">
        <AppBar
          position="fixed"
          color="primary"
          sx={{
            bottom: 0,
            top: "auto",
            justifyContent: "center",
            flexDirection: "row",
            gap: 3,
            py: 0.375,
          }}
        >
          <AppBarNavlink
            href="/"
            icon={pathname === "/" ? Home : HomeOutlined}
            isActive={pathname === "/"}
          />
          <AppBarNavlink
            href="/items"
            icon={pathname === "/items" ? Warehouse : WarehouseOutlined}
            isActive={pathname === "/items"}
          />
          <AppBarNavlink
            href="/settings"
            icon={pathname === "/settings" ? Settings : SettingsOutlined}
            isActive={pathname === "/settings"}
          />
        </AppBar>
      </Box>
    </>
  );
}
