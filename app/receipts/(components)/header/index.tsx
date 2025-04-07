import { CreateReceiptForm, ReceiptSearchField } from "@/features/receipt/components";
import { Box, Paper, Typography } from "@mui/material";

export function ReceiptsHeader() {
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
        mb: 2,
      }}
    >
      <Typography variant="h4">Receipts</Typography>
      <Box display="flex" alignItems="center" width="100%" justifyContent="end" gap={1}>
        <ReceiptSearchField />
        <CreateReceiptForm />
      </Box>
    </Paper>
  );
}
