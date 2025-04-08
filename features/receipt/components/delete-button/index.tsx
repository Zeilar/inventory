"use client";

import { deleteReceipt } from "@/common/receipt/actions";
import { ModalContent } from "@/components";
import { useDisclosure } from "@/hooks";
import { Alert, Box, Button, Modal, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";

interface DeleteReceiptButtonProps {
  id: number;
}

export function DeleteReceiptButton({ id }: DeleteReceiptButtonProps) {
  const [isPromptOpen, prompt] = useDisclosure();
  const { isLoading, mutate } = useMutation({
    mutationFn: () => deleteReceipt(id),
    onSuccess: () => {
      enqueueSnackbar({
        variant: "success",
        message: "Deleted receipt",
      });
    },
  });

  return (
    <>
      <Button color="error" onClick={prompt.open}>
        Delete
      </Button>
      <Modal open={isPromptOpen} onClose={prompt.close}>
        <ModalContent>
          <Typography variant="h5" mb={2}>
            Delete receipt
          </Typography>
          <Alert severity="error">Are you sure? This cannot be undone.</Alert>
          <Box display="flex" mt={2} gap={1} justifyContent="end">
            <Button onClick={prompt.close}>Cancel</Button>
            <Button variant="contained" color="error" onClick={() => mutate()} loading={isLoading}>
              Ok
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
