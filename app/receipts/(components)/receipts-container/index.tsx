import { Box, type BoxProps } from "@mui/material";

export function ReceiptsContainer(props: BoxProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(5, 1fr)"
      p={3}
      mx={6}
      gap={3}
      overflow="auto"
      {...props}
    />
  );
}
