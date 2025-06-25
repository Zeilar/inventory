"use client";

import NextLink from "next/link";
import { Link as ChakraLink, type LinkProps } from "@chakra-ui/react";

export const Link = ({ children, href = "#", ...props }: LinkProps) => (
  <ChakraLink
    asChild
    textDecor="none"
    _dark={{ color: "teal.solid", _hover: { color: "teal.fg" } }}
    _light={{ color: "teal.solid", _hover: { color: "teal.focusRing" } }}
    transition="colors"
    {...props}
  >
    <NextLink href={href}>{children}</NextLink>
  </ChakraLink>
);

export const UnstyledLink = ({ children, href = "#", ...props }: LinkProps) => (
  <ChakraLink asChild textDecor="none" {...props}>
    <NextLink href={href}>{children}</NextLink>
  </ChakraLink>
);
