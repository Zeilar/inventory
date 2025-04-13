"use client";

import { Pagination } from "@/components";
import { CreateReceiptForm, ReceiptSearchField } from "@/features/receipt/components";
import { Box, Paper, Typography } from "@mui/material";
import { useReceiptsPageContext } from "../../context";

interface ReceiptsHeaderProps {
  page: number;
  count: number;
  disablePagination?: boolean;
}

export function ReceiptsHeader({ count, page, disablePagination }: ReceiptsHeaderProps) {
  const { startTransition } = useReceiptsPageContext();

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
        <Pagination
          count={count}
          page={page}
          disabled={disablePagination}
          startTransition={startTransition}
        />
        <Box display="flex" alignItems="center" justifyContent="end" gap={1.5}>
          <ReceiptSearchField />
          <CreateReceiptForm />
        </Box>
      </Paper>
    </Box>
  );
}
