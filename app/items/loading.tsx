"use client";

import { Box, Button, Card, CardActions, CardContent, Skeleton } from "@mui/material";
import { ItemsContainerLayout, ItemsHeaderLayout } from "./(components)";
import { ItemSearchFieldLayout } from "@/features/item/components";
import { useSearchParams } from "next/navigation";
import { PER_PAGE } from "@/features/item/config";
import { Link } from "@/components";

export function ItemsCardsSkeletons() {
  return (
    <>
      {Array.from({ length: PER_PAGE }, (_, i) => (
        <Card
          key={i}
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <CardContent sx={{ px: 1, py: 0, width: "100%" }}>
            <Link href="#">
              <Skeleton />
            </Link>
          </CardContent>
          <CardActions sx={{ p: 0.75 }}>
            <Button disabled color="primary">
              Edit
            </Button>
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
      <ItemsHeaderLayout
        paginationProps={{ count: 1, page: 1, disabled: true }}
        searchField={<ItemSearchFieldLayout isLoading value={searchParams.get("search") ?? ""} />}
      />
      <ItemsContainerLayout>
        <ItemsCardsSkeletons />
      </ItemsContainerLayout>
    </Box>
  );
}
