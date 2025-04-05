import { createTheme } from "@mui/material";
import { roboto } from "./fonts/roboto";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "hsl(220, 30%, 7%)",
    },
    divider: "hsla(220, 20%, 25%, 0.6)",
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
          backgroundColor: "hsl(220, 35%, 3%)",
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
