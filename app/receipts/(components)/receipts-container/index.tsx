import { Box, type BoxProps } from "@mui/material";

export function ReceiptsContainer(props: BoxProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(5, 1fr)"
      gap={3}
      p={6}
      overflow="auto"
      {...props}
    />
  );
}
