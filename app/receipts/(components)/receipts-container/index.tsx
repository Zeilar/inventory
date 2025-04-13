"use client";

import { Box, type BoxProps } from "@mui/material";
import { useReceiptsPageContext } from "../../context";
import { ReceiptsCardsSkeletons } from "../../loading";

export function ReceiptsContainerLayout(props: BoxProps) {
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

/**
 * Do not use in loading.tsx.
 */
export function ReceiptsContainer({ children, ...props }: BoxProps) {
  const { isLoading } = useReceiptsPageContext();

  return (
    <ReceiptsContainerLayout {...props}>
      {!isLoading ? children : <ReceiptsCardsSkeletons />}
    </ReceiptsContainerLayout>
  );
}
