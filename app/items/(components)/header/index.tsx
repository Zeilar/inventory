"use client";

import { Pagination, type PaginationProps } from "@/components";
import {
  CreateItemForm,
  type CreateItemFormProps,
  ItemSearchField,
} from "@/features/item/components";
import { Box, Typography } from "@mui/material";
import { useItemsPageContext } from "../../context";
import type { ReactNode } from "react";

interface ItemsHeaderProps {
  page: number;
  count: number;
  disablePagination?: boolean;
}

interface ItemsHeaderLayoutProps {
  paginationProps: PaginationProps;
  createReceiptFormProps?: CreateItemFormProps;
  searchField: ReactNode;
}

export function ItemsHeaderLayout({
  createReceiptFormProps,
  paginationProps,
  searchField,
}: ItemsHeaderLayoutProps) {
  return (
    <>
      <Typography variant="h4">Items</Typography>
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Pagination {...paginationProps} />
          <Box display="flex" alignItems="center" justifyContent="end" gap={1.5}>
            {searchField}
            <CreateItemForm {...createReceiptFormProps} />
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
      createReceiptFormProps={{ disabled: isLoading }}
      searchField={<ItemSearchField />}
    />
  );
}
