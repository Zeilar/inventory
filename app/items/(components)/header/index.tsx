"use client";

import { Pagination, UnstyledLink, type PaginationProps } from "@/components";
import { ItemSearchField } from "@/features/item/components";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { useItemsPageContext } from "../../context";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Add, FilterAlt } from "@mui/icons-material";
import { PER_PAGE } from "@/features/item/config";

interface ItemsHeaderProps {
  page: number;
  count: number;
  disablePagination?: boolean;
}

interface ItemsHeaderLayoutProps {
  paginationProps: PaginationProps;
  searchField: ReactNode;
  onCheckAll?: VoidFunction;
  checked?: number[];
  isLoading?: boolean;
}

export function ItemsHeaderLayout({
  paginationProps,
  searchField,
  checked = [],
  onCheckAll,
  isLoading,
}: ItemsHeaderLayoutProps) {
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
        display="flex"
        flexDirection="column"
        gap={1.5}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={1.5} pl={1.5}>
          <Checkbox
            checked={checked.length === PER_PAGE}
            onChange={onCheckAll}
            disabled={isLoading}
            indeterminate={checked.length > 0 && checked.length < PER_PAGE}
          />
          <Box mr="auto">
            <Pagination {...paginationProps} />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="end" gap={1.5}>
            {searchField}
            <Button variant="outlined" startIcon={<FilterAlt />} sx={{ height: 40 }}>
              Filter
            </Button>
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
  const { isLoading, startTransition, checked, onCheckAll } = useItemsPageContext();

  return (
    <ItemsHeaderLayout
      paginationProps={{
        count,
        page,
        disabled: disablePagination || isLoading,
        startTransition,
      }}
      searchField={<ItemSearchField />}
      checked={checked}
      onCheckAll={onCheckAll}
    />
  );
}
