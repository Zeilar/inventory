"use client";

import { Pagination, type PaginationProps } from "@/components";
import {
  CreateReceiptForm,
  type CreateReceiptFormProps,
  ReceiptSearchField,
} from "@/features/receipt/components";
import { Box, Paper, Typography } from "@mui/material";
import { useReceiptsPageContext } from "../../context";
import type { ReactNode } from "react";

interface ReceiptsHeaderProps {
  page: number;
  count: number;
  disablePagination?: boolean;
}

interface ReceiptsHeaderLayoutProps {
  paginationProps: PaginationProps;
  createReceiptFormProps?: CreateReceiptFormProps;
  searchField: ReactNode;
}

export function ReceiptsHeaderLayout({
  createReceiptFormProps,
  paginationProps,
  searchField,
}: ReceiptsHeaderLayoutProps) {
  return (
    <Box m={9} mb={0}>
      <Typography variant="h4" mb={1.5}>
        Receipts
      </Typography>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1,
          p: 1.5,
        }}
      >
        <Pagination {...paginationProps} />
        <Box display="flex" alignItems="center" justifyContent="end" gap={1.5}>
          {searchField}
          <CreateReceiptForm {...createReceiptFormProps} />
        </Box>
      </Paper>
    </Box>
  );
}

export function ReceiptsHeader({ count, page, disablePagination }: ReceiptsHeaderProps) {
  const { isLoading, startTransition } = useReceiptsPageContext();

  return (
    <ReceiptsHeaderLayout
      paginationProps={{
        count,
        page,
        disabled: disablePagination,
        startTransition,
      }}
      createReceiptFormProps={{ disabled: isLoading }}
      searchField={<ReceiptSearchField />}
    />
  );
}
