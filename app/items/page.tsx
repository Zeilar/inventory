import { SearchParams } from "../types";
import type { GetItemsResponse } from "../api/items/types";
import { ItemsContainer, ItemsHeader } from "./(components)";
import { buildAppUrl } from "@/common";
import type { ItemsSearchParams } from "../api/items/route";
import { getSettings } from "../api/settings/getSettings";
import { Card, Flex, Text } from "@chakra-ui/react";
import { A11yBar } from "@/components";

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
    <Flex flexDir="column" gap={4} m={[4, 8]}>
      <A11yBar breadcrumbsProps={{ hrefs: [{ href: "/", label: "Home" }], current: "Items" }} />
      <Card.Root>
        <Card.Header>
          <ItemsHeader count={total} page={total ? parsedPage : 1} />
        </Card.Header>
        <Card.Body pt={2}>
          <ItemsContainer rows={items.map((item) => ({ item }))} />
          <Text mt={2} display={["none", "inline"]}>
            {getPaginationSummary(parsedPage, itemsPerPage, total)}
          </Text>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}
