import { Box, type BoxProps } from "@mui/material";

export function ReceiptsContainer(props: BoxProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(6, 1fr)"
      gap={1}
      p={2}
      overflow="auto"
      {...props}
    />
  );
}
