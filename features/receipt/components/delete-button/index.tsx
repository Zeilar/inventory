"use client";

import { deleteReceipt } from "@/common/receipt/actions";
import { Button } from "@mui/material";

interface DeleteReceiptButtonProps {
  id: number;
}

export function DeleteReceiptButton({ id }: DeleteReceiptButtonProps) {
  return (
    <Button
      color="error"
      variant="outlined"
      onClick={() => deleteReceipt(id)}
      sx={{ marginLeft: "auto" }}
    >
      Delete
    </Button>
  );
}
