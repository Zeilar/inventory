import { UnstyledLink } from "@/components/ui";
import { ButtonBase, useTheme, type SvgIconTypeMap } from "@mui/material";
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
  const { transitions } = useTheme();

  return (
    <UnstyledLink href={href}>
      <ButtonBase
        sx={{
          width: "100%",
          justifyContent: "start",
          gap: 1.5,
          p: 1.5,
          bgcolor: isActive ? "primary.main" : undefined,
          color: isActive ? "grey.900" : undefined,
          fontWeight: 500,
          fontSize: "medium",
          fontFamily: "var(--font-roboto)",
          transition: transitions.create(["background-color", "color"], {
            duration: transitions.duration.shortest,
          }),
          "&:hover": !isActive ? { backgroundColor: "grey.700" } : undefined,
        }}
      >
        <Icon color="inherit" />
        {label}
      </ButtonBase>
    </UnstyledLink>
  );
}
