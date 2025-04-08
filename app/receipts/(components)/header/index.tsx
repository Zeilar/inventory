import { Pagination } from "@/components";
import { CreateReceiptForm, ReceiptSearchField } from "@/features/receipt/components";
import { Box, Paper } from "@mui/material";

interface ReceiptsHeaderProps {
  page: number;
  count: number;
  disablePagination?: boolean;
}

export function ReceiptsHeader({ count, page, disablePagination }: ReceiptsHeaderProps) {
  return (
    <Paper
      sx={{
        borderRadius: 0,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <Pagination count={count} page={page} disabled={disablePagination} />
      <Box display="flex" alignItems="center" justifyContent="end" gap={1}>
        <ReceiptSearchField />
        <CreateReceiptForm />
      </Box>
    </Paper>
  );
}
