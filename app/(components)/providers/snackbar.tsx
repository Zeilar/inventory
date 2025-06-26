import { Alert } from "@chakra-ui/react";
import { type CustomContentProps, SnackbarProvider } from "notistack";
import { forwardRef } from "react";

export function CustomSnackbarProvider() {
  return (
    <SnackbarProvider
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      Components={{
        default: forwardRef<HTMLDivElement, CustomContentProps>(({ message }, ref) => (
          <Alert.Root variant="surface" status="neutral" ref={ref}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{message}</Alert.Title>
            </Alert.Content>
          </Alert.Root>
        )),
        success: forwardRef<HTMLDivElement, CustomContentProps>(({ message }, ref) => (
          <Alert.Root variant="surface" status="success" ref={ref}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{message}</Alert.Title>
            </Alert.Content>
          </Alert.Root>
        )),
        error: forwardRef<HTMLDivElement, CustomContentProps>(({ message }, ref) => (
          <Alert.Root variant="surface" status="error" ref={ref}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{message}</Alert.Title>
            </Alert.Content>
          </Alert.Root>
        )),
        info: forwardRef<HTMLDivElement, CustomContentProps>(({ message }, ref) => (
          <Alert.Root variant="surface" status="info" ref={ref}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{message}</Alert.Title>
            </Alert.Content>
          </Alert.Root>
        )),
        warning: forwardRef<HTMLDivElement, CustomContentProps>(({ message }, ref) => (
          <Alert.Root variant="surface" status="warning" ref={ref}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{message}</Alert.Title>
            </Alert.Content>
          </Alert.Root>
        )),
      }}
    />
  );
}
