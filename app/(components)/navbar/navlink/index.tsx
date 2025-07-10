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
      borderTop="2px solid"
      borderBottom="2px solid"
      borderColor="transparent"
      borderTopColor={isActive ? "bg.fg" : "transparent"}
      rounded="none"
      px={2}
    >
      <IconButton variant="plain">
        <Icon color={isActive ? "bg.fg" : "fg.muted"} transition="colors" size="lg">
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
      color={isActive ? "fg" : "fg.muted"}
      py={6}
      fontWeight={500}
      fontSize="lg"
      pos="relative"
      transition="colors"
      transitionDuration="faster"
      _hover={!isActive ? { color: "fg" } : undefined}
      _after={
        isActive
          ? {
              content: `""`,
              pos: "absolute",
              bottom: "-1px",
              w: "full",
              h: "1px",
              bgColor: "fg",
            }
          : undefined
      }
    >
      {label}
    </UnstyledLink>
  );
}
