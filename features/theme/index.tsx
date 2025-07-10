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
        border: {
          value: {
            _light: "{colors.gray.300}",
            _dark: "{colors.gray.800}",
          },
        },
      },
    }),
  },
});

export const system = createSystem(defaultConfig, customConfig);
