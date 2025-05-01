"use client";

import { Box, type BoxProps } from "@mui/material";
import { useItemsPageContext } from "../../context";
import { ItemsCardsSkeletons } from "../../loading";

export function ItemsContainerLayout(props: BoxProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      mt={1.5}
      gap={0.75}
      overflow="auto"
      width="100%"
      {...props}
    />
  );
}

/**
 * Do not use in loading.tsx.
 */
export function ItemsContainer({ children, ...props }: BoxProps) {
  const { isLoading } = useItemsPageContext();

  return (
    <ItemsContainerLayout {...props}>
      {!isLoading ? children : <ItemsCardsSkeletons />}
    </ItemsContainerLayout>
  );
}
