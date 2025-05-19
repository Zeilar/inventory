"use client";

import { Box, Button, Card, CardActions, CardContent, Checkbox, Skeleton } from "@mui/material";
import { ItemsContainerLayout, ItemsHeaderLayout } from "./(components)";
import { ItemSearchFieldLayout } from "@/features/item/components";
import { useSearchParams } from "next/navigation";
import { Link } from "@/components";
import { Delete, Edit } from "@mui/icons-material";
import { useSettings } from "../(components)/providers/settings";

export function ItemsCardsSkeletons() {
  const { itemsPerPage } = useSettings();

  return (
    <>
      {Array.from({ length: itemsPerPage }, (_, i) => (
        <Card
          key={i}
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <CardContent sx={{ p: 1.5, width: "100%", display: "flex", alignItems: "center" }}>
            <Checkbox sx={{ mr: 1.5 }} disabled />
            <Link href="#" sx={{ width: "100%" }}>
              <Skeleton />
            </Link>
          </CardContent>
          <CardActions sx={{ p: 1.5, gap: 0.75 }}>
            <Button variant="outlined" disabled startIcon={<Edit />} color="primary">
              Edit
            </Button>
            <Button variant="outlined" disabled startIcon={<Delete />} color="error">
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
  const search = searchParams.get("search");

  return (
    <Box width="100%">
      <ItemsHeaderLayout
        paginationProps={{ count: 1, page: 1, disabled: true }}
        searchField={<ItemSearchFieldLayout isLoading value={search ?? ""} search={search} />}
      />
      <ItemsContainerLayout rows={[]}>{/* <ItemsCardsSkeletons /> */}</ItemsContainerLayout>
    </Box>
  );
}
