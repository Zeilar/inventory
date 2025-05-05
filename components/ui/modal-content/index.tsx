import { Box, BoxProps } from "@mui/material";

export function ModalContent({ sx, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        px: 3,
        py: 2,
        borderRadius: 2,
        ...sx,
      }}
    />
  );
}
