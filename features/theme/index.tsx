import { Color, createTheme } from "@mui/material";
import { roboto } from "./fonts/roboto";

export let theme = createTheme();

const grey: Partial<Color> = {
  50: "hsl(216, 30%, 65%)",
  100: "hsl(216, 30%, 50%)",
  200: "hsl(216, 30%, 40%)",
  300: "hsl(216, 30%, 35%)",
  400: "hsl(216, 30%,  25%)",
  500: "hsl(216, 30%, 20%)",
  600: "hsl(216, 30%, 15%)",
  700: "hsl(216, 30%, 12%)", // #233044
  800: "hsl(216, 30%, 8%)", // #1B2635
  900: "hsl(216, 30%, 5%)",
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
    text: {
      primary: "hsl(210, 9%, 90%)",
    },
  },
  typography: {
    allVariants: {
      fontFamily: roboto.style.fontFamily,
    },
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
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
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[4],
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
          return { border: "1px solid", borderColor, boxShadow: 0 };
        },
      },
    },
  },
});
