import { Alert, SxProps } from "@mui/material";
import { type CustomContentProps, SnackbarProvider } from "notistack";
import { forwardRef } from "react";

const alertStyles: SxProps = {
  bgcolor: "background.paper",
  boxShadow: 4,
};

export function CustomSnackbarProvider() {
  return (
    <SnackbarProvider
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      Components={{
        default: ({ message }: CustomContentProps) => <Alert variant="outlined">{message}</Alert>,
        success: forwardRef<HTMLDivElement, CustomContentProps>(({ message }, ref) => (
          <Alert sx={alertStyles} variant="outlined" severity="success" ref={ref}>
            {message}
          </Alert>
        )),
        error: forwardRef<HTMLDivElement, CustomContentProps>(({ message }, ref) => (
          <Alert sx={alertStyles} variant="outlined" severity="error" ref={ref}>
            {message}
          </Alert>
        )),
        info: forwardRef<HTMLDivElement, CustomContentProps>(({ message }, ref) => (
          <Alert sx={alertStyles} variant="outlined" severity="info" ref={ref}>
            {message}
          </Alert>
        )),
        warning: forwardRef<HTMLDivElement, CustomContentProps>(({ message }, ref) => (
          <Alert sx={alertStyles} variant="outlined" severity="warning" ref={ref}>
            {message}
          </Alert>
        )),
      }}
    />
  );
}
