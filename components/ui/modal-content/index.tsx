import { Box, BoxProps } from "@mui/material";

export function ModalContent({ sx, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        position: "absolute",
        top: "35%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        px: 3,
        py: 2,
        borderRadius: 2,
        ...sx,
      }}
    />
  );
}
