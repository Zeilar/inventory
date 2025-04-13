"use client";

import { Box, Button, Card, CardActions, CardContent, Skeleton } from "@mui/material";
import { ReceiptsContainerLayout, ReceiptsHeaderLayout } from "./(components)";
import { PER_PAGE } from "@/features/receipt/config";
import { imageCardHeight } from "@/common/image";
import { ReceiptSearchFieldLayout } from "@/features/receipt/components";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  return (
    <Box width="100%">
      <ReceiptsHeaderLayout
        paginationProps={{ count: 1, page: 1, disabled: true }}
        createReceiptFormProps={{ disabled: true }}
        searchField={
          <ReceiptSearchFieldLayout isLoading value={searchParams.get("search") ?? ""} />
        }
      />
      <ReceiptsContainerLayout>
        <ReceiptsCardsSkeletons />
      </ReceiptsContainerLayout>
    </Box>
  );
}
