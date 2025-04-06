"use client";

import { Home, Receipt } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { UnstyledLink } from "../../ui/link";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Paper
      sx={{
        height: "100svh",
        minWidth: 250,
        borderTop: 0,
        borderLeft: 0,
        borderBottom: 0,
        borderRadius: 0,
        position: "sticky",
        top: 0,
      }}
    >
      <List sx={{ p: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
        <UnstyledLink href="/">
          <ListItem disablePadding>
            <ListItemButton sx={{ gap: 2, py: 0.5 }} selected={pathname === "/"} disableRipple>
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <Home fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontWeight={500}>Home</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </UnstyledLink>
        <UnstyledLink href="/receipts">
          <ListItem disablePadding>
            <ListItemButton
              sx={{ gap: 2, py: 0.5 }}
              selected={pathname === "/receipts"}
              disableRipple
            >
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <Receipt fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontWeight={500}>Receipts</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </UnstyledLink>
      </List>
    </Paper>
  );
}
