import { createSystem, defaultConfig, defineConfig, defineSemanticTokens } from "@chakra-ui/react";
import { roboto } from "./fonts";

const customConfig = defineConfig({
  globalCss: {
    body: {
      fontFamily: roboto.style.fontFamily,
    },
    "::selection": {
      bgColor: "bg.muted",
      color: "fg",
    },
  },
  theme: {
    tokens: {
      colors: {
        gray: {
          50: { value: "#f7faff" },
          100: { value: "#f0f4fa" },
          200: { value: "#c9d4e3" },
          300: { value: "#a3b2c5" },
          400: { value: "#677f9c" },
          500: { value: "#41516b" },
          600: { value: "#29354b" },
          700: { value: "#242647" },
          800: { value: "#1f223d" },
          900: { value: "#151627" },
          950: { value: "#0d0d1a" }, // base anchor for dark
        },
      },
    },
    semanticTokens: defineSemanticTokens({
      colors: {
        fg: {
          DEFAULT: {
            value: {
              _light: "{colors.gray.600}",
              _dark: "{colors.gray.50}",
            },
          },
        },
        bg: {
          DEFAULT: {
            value: {
              _light: "{colors.gray.100}",
              _dark: "{colors.gray.950}",
            },
          },
          panel: {
            value: {
              _light: "{colors.gray.50}",
              _dark: "{colors.gray.900}",
            },
          },
        },
        border: {
          value: {
            _light: "{colors.gray.200}",
            _dark: "{colors.gray.700}",
          },
        },
      },
    }),
  },
});

export const system = createSystem(defaultConfig, customConfig);
