import { UnstyledLink } from "@/components/ui";
import { Button, Icon, IconButton } from "@chakra-ui/react";
import type { ReactNode } from "react";
import type { IconType } from "react-icons/lib";

interface NavlinkProps {
  isActive: boolean;
  href: string;
  icon: IconType;
  label?: ReactNode;
}

export function AppBarNavlink({ href, icon: IconComponent, isActive }: NavlinkProps) {
  return (
    <UnstyledLink href={href}>
      <IconButton>
        <Icon color={isActive ? "primary" : "secondary"} transition="colors">
          <IconComponent />
        </Icon>
      </IconButton>
    </UnstyledLink>
  );
}

export function DesktopNavlink({ href, icon: Icon, isActive, label }: NavlinkProps) {
  return (
    <UnstyledLink href={href} rounded="sm">
      <Button
        rounded="sm"
        width="100%"
        justifyContent="start"
        px={4}
        py={3}
        gap={3}
        bgColor={isActive ? "teal.subtle" : "transparent"}
        color={isActive ? "teal.fg" : "fg"}
        fontWeight={500}
        fontSize="medium"
        transition="colors"
        transitionDuration="fast"
        height="auto"
        border={0}
        _hover={!isActive ? { backgroundColor: "gray.subtle" } : undefined}
      >
        <Icon color="inherit" />
        {label}
      </Button>
    </UnstyledLink>
  );
}
