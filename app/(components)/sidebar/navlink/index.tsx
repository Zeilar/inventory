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
    <UnstyledLink
      href={href}
      h="full"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="transparent"
      borderTopColor={isActive ? "teal.fg" : "transparent"}
      px={1}
    >
      <IconButton variant="plain">
        <Icon color={isActive ? "teal.fg" : "fg.muted"} transition="colors" size="lg">
          <IconComponent />
        </Icon>
      </IconButton>
    </UnstyledLink>
  );
}

export function DesktopNavlink({ href, icon: IconComponent, isActive, label }: NavlinkProps) {
  return (
    <UnstyledLink href={href} rounded="sm">
      <Button
        variant="ghost"
        rounded="sm"
        w="100%"
        justifyContent="start"
        p={4}
        gap={3}
        bgColor={isActive ? "teal.subtle" : "transparent"}
        color={isActive ? "teal.fg" : "fg"}
        fontWeight={500}
        fontSize="lg"
        transitionProperty="background-color"
        transitionDuration="fast"
        h="50px"
        _hover={!isActive ? { bgColor: "gray.subtle" } : undefined}
      >
        <Icon size="lg" w="5" h="5">
          <IconComponent />
        </Icon>
        {label}
      </Button>
    </UnstyledLink>
  );
}
