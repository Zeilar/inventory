import { SearchParams } from "../types";
import type { GetItemsResponse } from "../api/items/types";
import { ItemsContainer, ItemsHeader } from "./(components)";
import { ItemsPageProvider } from "./context";
import { buildAppUrl } from "@/common";
import type { ItemsSearchParams } from "../api/items/route";
import { Typography } from "@mui/material";
import { getSettings } from "../api/settings/getSettings";

function getPaginationSummary(
  currentPage: number,
  itemsPerPage: number,
  totalItems: number
): string {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalItems === 0 || !start || !end) {
    return "Showing 0 of 0 results";
  }

  return `Showing ${start || 0}-${end || 0} of ${totalItems} results`;
}

export const dynamic = "force-dynamic";

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
  const { items = [], total }: GetItemsResponse = await res.json();
  const parsedPage = parseInt(page) || 1;

  return (
    <ItemsPageProvider>
      <ItemsHeader
        count={total ? Math.ceil(total / itemsPerPage) : 1}
        page={total ? parsedPage : 1}
      />
      <ItemsContainer rows={items.map((item) => ({ item }))}></ItemsContainer>
      <Typography mt={1.5}>{getPaginationSummary(parsedPage, itemsPerPage, total)}</Typography>
    </ItemsPageProvider>
  );
}
