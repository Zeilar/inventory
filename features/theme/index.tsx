import { Color, createTheme } from "@mui/material";
import { roboto } from "./fonts/roboto";

export let theme = createTheme();

const grey: Partial<Color> = {
  50: "hsl(220, 30%, 98%)",
  100: "hsl(220, 30%, 94%)",
  200: "hsl(220, 30%, 86%)",
  300: "hsl(220, 30%, 72%)",
  400: "hsl(220, 30%, 56%)",
  500: "hsl(220, 30%, 30%)",
  600: "hsl(220, 30%, 15%)",
  700: "hsl(220, 30%, 7%)",
  800: "hsl(220, 30%, 5%)",
  900: "hsl(220, 30%, 3%)",
};

theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: grey[700],
      default: grey[700],
    },
    divider: grey[600],
    common: { black: "#000" },
    grey,
  },
  typography: {
    allVariants: {
      ...roboto.style,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: grey[800],
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: "none",
          border: "2px solid",
          borderColor: theme.palette.divider,
        }),
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 500,
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
  },
});
