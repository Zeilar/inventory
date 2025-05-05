import { Box, Typography } from "@mui/material";
import { SearchParams } from "../types";
import type { GetItemsResponse } from "../api/items/types";
import { PER_PAGE } from "@/features/item/config";
import { ItemCard, ItemsContainer, ItemsHeader } from "./(components)";
import { ItemsPageProvider } from "./context";

export default async function Page({ searchParams }: SearchParams<"search" | "page">) {
  const { search = "", page = "1" } = await searchParams;
  const res = await fetch(
    `http://localhost:3000/api/items?${new URLSearchParams({ search, page })}`
  );
  const { items, total }: GetItemsResponse = await res.json();

  return (
    <ItemsPageProvider>
      <Box width="100%">
        <ItemsHeader
          count={total ? Math.ceil(total / PER_PAGE) : 1}
          page={total ? parseInt(page) : 1}
        />
        <ItemsContainer>
          {items.length ? (
            items.map(({ title, id }) => <ItemCard key={id} id={id} title={title} />)
          ) : (
            <Typography>No results for: {search}</Typography>
          )}
        </ItemsContainer>
      </Box>
    </ItemsPageProvider>
  );
}
