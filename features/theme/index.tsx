import { type Color, createTheme } from "@mui/material";

export let theme = createTheme();

export const SIDEBAR_WIDTH = 300;

const grey: Omit<Color, "A100" | "A200" | "A400" | "A700"> = {
  50: "hsl(216, 30%, 65%)",
  100: "hsl(216, 30%, 50%)",
  200: "hsl(216, 30%, 40%)",
  300: "hsl(216, 30%, 35%)",
  400: "hsl(216, 30%,  25%)",
  500: "hsl(216, 30%, 20%)",
  600: "hsl(216, 30%, 15%)",
  700: "hsl(216, 30%, 12%)",
  800: "hsl(216, 30%, 8%)",
  900: "hsl(216, 30%, 5%)",
};

const primary: Omit<Color, "A100" | "A200" | "A400" | "A700"> = {
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
    divider: grey[500],
    common: { black: "#000" },
    grey,
    primary,
    secondary: {
      main: grey[50],
    },
    text: {
      primary: "hsl(210, 9%, 90%)",
      secondary: "hsl(210, 9%, 0%)",
    },
  },
  cssVariables: true,
  typography: {
    h1: { fontWeight: 600, fontFamily: "var(--font-open-sans)" },
    h2: { fontWeight: 600, fontFamily: "var(--font-open-sans)" },
    h3: { fontWeight: 600, fontFamily: "var(--font-open-sans)" },
    h4: { fontWeight: 600, fontFamily: "var(--font-open-sans)" },
    h5: { fontWeight: 500, fontFamily: "var(--font-open-sans)" },
    h6: { fontWeight: 500, fontFamily: "var(--font-open-sans)" },
    button: { fontFamily: "var(--font-roboto)" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: grey[800],
        },
        "::selection": {
          color: primary[500],
          backgroundColor: grey[500],
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: "none",
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: "none",
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
          return { border: "1px solid", borderColor, boxShadow: "none" };
        },
      },
    },
    MuiChip: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        icon: ({ theme }) => ({ marginLeft: theme.spacing(1) }),
        root: ({ theme, ownerState }) => {
          let borderColor;
          switch (ownerState.color) {
            case "primary":
              borderColor = theme.palette.primary.dark;
              break;
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
            case "secondary":
              borderColor = theme.palette.secondary.dark;
              break;
            case "default":
            default:
              borderColor = theme.palette.divider;
              break;
          }
          return { border: "1px solid", borderColor, boxShadow: "none" };
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(1.5),
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: grey[500],
        },
      },
    },
  },
});
