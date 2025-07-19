import { Box, type BoxProps } from "@chakra-ui/react";

export function Panel(props: BoxProps) {
  return (
    <Box p={[4, 8]} border="1px solid {colors.border}" rounded="md" bgColor="bg.panel" {...props} />
  );
}
