"use client";

import type { BoxProps } from "@chakra-ui/react";
import { Box, Button, Icon } from "@chakra-ui/react";
import { ThemeProvider, useTheme, type ThemeProviderProps } from "next-themes";
import { forwardRef } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export type ColorModeProviderProps = ThemeProviderProps;

export function ColorModeProvider(props: ColorModeProviderProps) {
  return <ThemeProvider attribute="class" disableTransitionOnChange {...props} />;
}

export type ColorMode = "light" | "dark";

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme();
  const colorMode = (forcedTheme || resolvedTheme) ?? "dark";
  const toggleColorMode = () => {
    setTheme((p) => (p === "dark" ? "light" : "dark"));
  };

  return {
    colorMode: colorMode as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

export const ColorModeSwitcher = forwardRef<HTMLDivElement, BoxProps>(function ColorModeButton(
  props,
  ref
) {
  const { setColorMode } = useColorMode();

  return (
    <Box
      ref={ref}
      display="grid"
      gridTemplateColumns="1fr 1fr"
      rounded="sm"
      border="1px solid {colors.border}"
      {...props}
    >
      <Button
        variant="plain"
        onClick={() => setColorMode("light")}
        w="full"
        rounded="sm"
        _light={{ bgColor: "yellow.muted" }}
      >
        <Icon color="yellow.fg" size="sm">
          <MdLightMode />
        </Icon>
        Light
      </Button>
      <Button
        variant="plain"
        onClick={() => setColorMode("dark")}
        w="full"
        rounded="sm"
        _dark={{ bgColor: "bg.muted" }}
      >
        <Icon color="fg" size="sm">
          <MdDarkMode />
        </Icon>
        Dark
      </Button>
    </Box>
  );
});
