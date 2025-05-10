import { Box, Typography } from "@mui/material";
import { SearchParams } from "../types";
import type { GetItemsResponse } from "../api/items/types";
import { ItemCard, ItemsContainer, ItemsHeader } from "./(components)";
import { ItemsPageProvider } from "./context";
import { getSettings } from "../api/settings/route";
import { buildAppUrl } from "@/common";

export default async function Page({ searchParams }: SearchParams<"search" | "page">) {
  const { itemsPerPage } = await getSettings();
  const { search = "", page = "1" } = await searchParams;
  const res = await fetch(buildAppUrl(`/api/items?${new URLSearchParams({ search, page })}`));
  const { items, total }: GetItemsResponse = await res.json();

  return (
    <ItemsPageProvider itemIds={items.flatMap(({ id }) => id)}>
      <Box width="100%">
        <ItemsHeader
          count={total ? Math.ceil(total / itemsPerPage) : 1}
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
