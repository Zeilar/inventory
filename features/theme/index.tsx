import { createSystem, defaultConfig, defineConfig, defineSemanticTokens } from "@chakra-ui/react";
import { roboto } from "./fonts";

const customConfig = defineConfig({
  globalCss: {
    body: {
      fontFamily: roboto.style.fontFamily,
      _dark: {
        bgColor: "#080808",
      },
      _light: {
        bgColor: "gray.100",
      },
    },
    "::selection": {
      bgColor: "teal.muted",
      color: "fg",
    },
  },
  theme: {
    semanticTokens: defineSemanticTokens({
      colors: {
        bg: {
          panel: {
            value: {
              _light: "{colors.white}",
              _dark: "#0e0e0e",
            },
          },
        },
        black: {
          value: "#080808", // Based on teal surface.
        },
        fg: {
          DEFAULT: {
            value: {
              _light: "{colors.gray.800}",
              _dark: "{colors.gray.100}",
            },
          },
        },
      },
    }),
  },
});

export const system = createSystem(defaultConfig, customConfig);
