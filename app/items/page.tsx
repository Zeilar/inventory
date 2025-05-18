import { Box, Typography } from "@mui/material";
import { SearchParams } from "../types";
import type { GetItemsResponse } from "../api/items/types";
import { ItemCard, ItemsContainer, ItemsHeader } from "./(components)";
import { ItemsPageProvider } from "./context";
import { getSettings } from "../api/settings/route";
import { buildAppUrl } from "@/common";
import type { ItemsSearchParams } from "../api/items/route";

export default async function Page({ searchParams }: SearchParams<ItemsSearchParams>) {
  const { itemsPerPage } = await getSettings();

  const { search = "", page = "1", ...rest } = await searchParams;
  const newSearchParams = new URLSearchParams({ search, page });
  Object.entries(rest).forEach(([key, value]) => {
    if (!value) {
      return;
    }
    newSearchParams.set(key, value);
  });

  const res = await fetch(buildAppUrl(`/api/items?${newSearchParams}`));
  const { items, total }: GetItemsResponse = await res.json();

  return (
    <ItemsPageProvider itemIds={items.flatMap(({ id }) => id)}>
      <Box width="100%">
        <ItemsHeader
          count={total ? Math.ceil(total / itemsPerPage) : 1}
          page={total ? parseInt(page) : 1}
          hasResults={total > 0}
        />
        <ItemsContainer>
          {items.length ? (
            items.map(({ title, id, archived }) => (
              <ItemCard key={id} id={id} title={title} archived={archived} />
            ))
          ) : (
            <Typography>No results!</Typography>
          )}
        </ItemsContainer>
      </Box>
    </ItemsPageProvider>
  );
}
