import { HideImage } from "@mui/icons-material";
import { Box, type BoxProps } from "@mui/material";

export function ImagePlaceholder(props: BoxProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      bgcolor="grey.800"
      {...props}
    >
      <HideImage color="primary" />
    </Box>
  );
}
