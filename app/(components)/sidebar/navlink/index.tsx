import { UnstyledLink } from "@/components/ui";
import { Typography, type SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { ReactNode } from "react";

interface NavlinkProps {
  isActive: boolean;
  href: string;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  label: ReactNode;
}

export function Navlink({ href, icon: Icon, isActive, label }: NavlinkProps) {
  return (
    <UnstyledLink
      href={href}
      sx={{
        display: "flex",
        width: "100%",
        gap: 1.5,
        justifyContent: "start",
        px: 1.5,
        py: 0.75,
        color: isActive ? "primary.main" : "text.secondary",
        transition: (theme) =>
          theme.transitions.create("color", {
            duration: theme.transitions.duration.shortest,
          }),
        "&:hover": !isActive
          ? {
              color: "text.primary",
            }
          : undefined,
      }}
    >
      <Icon color="inherit" />
      <Typography>{label}</Typography>
    </UnstyledLink>
  );
}
