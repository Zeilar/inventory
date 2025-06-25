import { createSystem, defaultConfig, defineConfig, defineSemanticTokens } from "@chakra-ui/react";
import { roboto } from "./fonts";

const customConfig = defineConfig({
  globalCss: {
    body: {
      fontFamily: roboto.style.fontFamily,
      _dark: {
        bgColor: "black",
      },
      _light: {
        bgColor: "gray.100",
      },
    },
  },
  theme: {
    semanticTokens: defineSemanticTokens({
      colors: {
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
