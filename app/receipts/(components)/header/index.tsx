"use client";

import { CreateReceiptForm, ReceiptSearchField } from "@/features/receipt/components";
import { Box, Typography } from "@mui/material";

export function ReceiptsHeader() {
  return (
    <Box
      p={2}
      display="flex"
      alignContent="center"
      justifyContent="space-between"
      position="sticky"
      bgcolor="common.black"
      borderBottom="2px solid"
      borderColor="divider"
      top={0}
      mb={2}
    >
      <Typography variant="h4">Receipts</Typography>
      <Box display="flex" alignItems="center" width="100%" justifyContent="end" gap={1}>
        <ReceiptSearchField />
        <CreateReceiptForm />
      </Box>
    </Box>
  );
}
