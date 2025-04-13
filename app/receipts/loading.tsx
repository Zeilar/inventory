"use client";

import { Box, Button, Card, CardActions, CardContent, Skeleton } from "@mui/material";
import { ReceiptsContainerLayout, ReceiptsHeader } from "./(components)";
import { PER_PAGE } from "@/features/receipt/config";
import { imageCardHeight } from "@/common/image";

export function ReceiptsCardsSkeletons() {
  return (
    <>
      {Array.from({ length: PER_PAGE }, (_, i) => (
        <Card key={i} sx={{ display: "flex", flexDirection: "column" }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={imageCardHeight}
            sx={{ transform: "none" }}
          />
          <CardContent>
            <Skeleton width="65%" />
          </CardContent>
          <CardActions sx={{ mt: "auto", pt: 0 }}>
            <Button disabled>Edit</Button>
            <Button disabled color="error">
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}

export default function Loading() {
  return (
    <Box width="100%">
      <ReceiptsHeader count={1} page={1} disablePagination />
      <ReceiptsContainerLayout>
        <ReceiptsCardsSkeletons />
      </ReceiptsContainerLayout>
    </Box>
  );
}
