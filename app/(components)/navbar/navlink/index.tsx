import { UnstyledLink } from "@/components/ui";
import { Icon, IconButton } from "@chakra-ui/react";
import type { ReactNode } from "react";
import type { IconType } from "react-icons/lib";

interface AppbarNavlinkProps {
  isActive: boolean;
  href: string;
  icon: IconType;
  label?: ReactNode;
}

interface DesktopNavlinkProps {
  isActive: boolean;
  href: string;
  label?: ReactNode;
}

export function AppBarNavlink({ href, icon: IconComponent, isActive }: AppbarNavlinkProps) {
  return (
    <UnstyledLink
      href={href}
      h="full"
      px={1}
      pos="relative"
      _after={
        isActive
          ? {
              content: `""`,
              pos: "absolute",
              left: 0,
              top: "-1px",
              w: "full",
              h: "1px",
              bgColor: "cyan.fg",
            }
          : undefined
      }
    >
      <IconButton variant="plain">
        <Icon color={isActive ? "cyan.fg" : "fg.muted"} transition="colors" size="lg">
          <IconComponent />
        </Icon>
      </IconButton>
    </UnstyledLink>
  );
}

export function DesktopNavlink({ href, isActive, label }: DesktopNavlinkProps) {
  return (
    <UnstyledLink
      href={href}
      color={isActive ? "cyan.fg" : "fg.muted"}
      py={6}
      fontWeight={500}
      fontSize="lg"
      pos="relative"
      transition="colors"
      transitionDuration="faster"
      _hover={!isActive ? { color: "cyan.fg" } : undefined}
      _after={
        isActive
          ? {
              content: `""`,
              pos: "absolute",
              bottom: "-1px",
              w: "full",
              h: "1px",
              bgColor: "cyan.fg",
            }
          : undefined
      }
    >
      {label}
    </UnstyledLink>
  );
}
