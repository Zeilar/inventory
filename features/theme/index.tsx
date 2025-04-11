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

const primary: Partial<Color> = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#29b6f6",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
};

theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: grey[700],
      default: grey[700],
    },
    divider: "hsla(220, 20%, 25%, 0.6)",
    common: { black: "#000" },
    grey,
    primary,
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
          border: "1px solid",
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
    MuiAlert: {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          let borderColor = theme.palette.divider;
          switch (ownerState.severity) {
            case "error":
              borderColor = theme.palette.error.dark;
              break;
            case "info":
              borderColor = theme.palette.info.dark;
              break;
            case "success":
              borderColor = theme.palette.success.dark;
              break;
            case "warning":
              borderColor = theme.palette.warning.dark;
              break;
          }
          return { borderColor };
        },
      },
    },
  },
});
