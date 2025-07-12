"use client";

import NextLink from "next/link";
import { Link as ChakraLink, type LinkProps } from "@chakra-ui/react";

export const Link = ({ children, href = "#", ...props }: LinkProps) => (
  <ChakraLink
    asChild
    textDecor="none"
    _dark={{ color: "cyan.solid", _hover: { color: "cyan.fg" } }}
    _light={{ color: "cyan.solid", _hover: { color: "bg.focusRing" } }}
    transition="colors"
    outline={0}
    {...props}
  >
    <NextLink href={href}>{children}</NextLink>
  </ChakraLink>
);

export const UnstyledLink = ({ children, href = "#", ...props }: LinkProps) => (
  <ChakraLink asChild textDecor="none" outline={0} {...props}>
    <NextLink href={href}>{children}</NextLink>
  </ChakraLink>
);
