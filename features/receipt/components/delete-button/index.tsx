"use client";

import { deleteReceipt } from "@/common/receipt/actions";
import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";

interface DeleteReceiptButtonProps {
  id: number;
}

export function DeleteReceiptButton({ id }: DeleteReceiptButtonProps) {
  const { isLoading, mutate } = useMutation({
    mutationKey: [`delete-receipt-${id}`],
    mutationFn: () => deleteReceipt(id),
    onSuccess: () => {
      console.log("here");
      enqueueSnackbar({
        variant: "success",
        message: "Deleted receipt",
      });
    },
  });

  return (
    <Button color="error" onClick={() => mutate()} loading={isLoading}>
      Delete
    </Button>
  );
}
