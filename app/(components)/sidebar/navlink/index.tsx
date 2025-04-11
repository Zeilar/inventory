import { UnstyledLink } from "@/components/ui";
import { alpha, ButtonBase, Typography, type SvgIconTypeMap } from "@mui/material";
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
    <UnstyledLink href={href} sx={{ display: "flex" }}>
      <ButtonBase
        sx={{
          width: "100%",
          display: "flex",
          gap: 2,
          justifyContent: "start",
          px: 1.5,
          py: 1.5,
          borderRadius: 2,
          bgcolor: (theme) => (isActive ? alpha(theme.palette.grey[500], 0.25) : undefined),
          transition: (theme) =>
            theme.transitions.create("background-color", {
              duration: theme.transitions.duration.shorter,
            }),
          "&:hover": {
            bgcolor: "grey.600",
          },
        }}
      >
        <Icon color={isActive ? "primary" : "action"} />
        <Typography variant="body1" fontWeight={500}>
          {label}
        </Typography>
      </ButtonBase>
    </UnstyledLink>
  );
}
