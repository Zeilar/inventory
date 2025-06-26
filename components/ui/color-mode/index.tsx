"use client";

import type { IconButtonProps, SpanProps } from "@chakra-ui/react";
import { IconButton, Span } from "@chakra-ui/react";
import { ThemeProvider, useTheme, type ThemeProviderProps } from "next-themes";
import { forwardRef } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

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

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

type ColorModeButtonProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeButton = forwardRef<HTMLButtonElement, ColorModeButtonProps>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode();

    return (
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        color="teal.fg"
        ref={ref}
        {...props}
        css={{
          _icon: {
            width: "4",
            height: "4",
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    );
  }
);

export const LightMode = forwardRef<HTMLSpanElement, SpanProps>(function LightMode(props, ref) {
  return (
    <Span
      color="fg"
      display="contents"
      className="chakra-theme light"
      colorPalette="gray"
      colorScheme="light"
      ref={ref}
      {...props}
    />
  );
});

export const DarkMode = forwardRef<HTMLSpanElement, SpanProps>(function DarkMode(props, ref) {
  return (
    <Span
      color="fg"
      display="contents"
      className="chakra-theme dark"
      colorPalette="gray"
      colorScheme="dark"
      ref={ref}
      {...props}
    />
  );
});
