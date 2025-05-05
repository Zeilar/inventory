"use client";

import { Pagination, UnstyledLink, type PaginationProps } from "@/components";
import { ItemSearchField } from "@/features/item/components";
import { Box, Button, Typography } from "@mui/material";
import { useItemsPageContext } from "../../context";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Add } from "@mui/icons-material";

interface ItemsHeaderProps {
  page: number;
  count: number;
  disablePagination?: boolean;
}

interface ItemsHeaderLayoutProps {
  paginationProps: PaginationProps;
  searchField: ReactNode;
}

export function ItemsHeaderLayout({ paginationProps, searchField }: ItemsHeaderLayoutProps) {
  return (
    <>
      <Breadcrumbs hrefs={[{ href: "/", label: "Home" }]} current="Items" />
      <Typography variant="h4" mt={1.5}>
        Items
      </Typography>
      <Box
        position="sticky"
        top={0}
        zIndex={1}
        bgcolor="grey.800"
        borderBottom="1px solid"
        borderColor="divider"
        py={1.5}
        width="100%"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={3}>
          <Pagination {...paginationProps} />
          <Box display="flex" alignItems="center" justifyContent="end" gap={1.5}>
            {searchField}
            <UnstyledLink href="/items/create">
              <Button variant="contained" startIcon={<Add />} sx={{ height: 40 }}>
                Create
              </Button>
            </UnstyledLink>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export function ItemsHeader({ count, page, disablePagination }: ItemsHeaderProps) {
  const { isLoading, startTransition } = useItemsPageContext();

  return (
    <ItemsHeaderLayout
      paginationProps={{
        count,
        page,
        disabled: disablePagination || isLoading,
        startTransition,
      }}
      searchField={<ItemSearchField />}
    />
  );
}
