"use client";

import { ModalContent } from "@/components";
import { useDisclosure } from "@/hooks";
import { Alert, Box, Button, Modal, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";
import { deleteItem } from "./action";
import { Delete } from "@mui/icons-material";

interface DeleteItemButtonProps {
  id: number;
}

export function DeleteItemButton({ id }: DeleteItemButtonProps) {
  const [isPromptOpen, prompt] = useDisclosure();
  const { isLoading, mutate } = useMutation({
    mutationFn: () => deleteItem(id),
    onSuccess: () => {
      enqueueSnackbar({
        variant: "success",
        message: "Deleted item",
      });
    },
  });

  return (
    <>
      <Button variant="outlined" startIcon={<Delete />} color="error" onClick={prompt.open}>
        Delete
      </Button>
      <Modal open={isPromptOpen} onClose={prompt.close}>
        <ModalContent>
          <Typography variant="h5" mb={2}>
            Delete item
          </Typography>
          <Alert severity="error">Are you sure? This cannot be undone.</Alert>
          <Box display="flex" mt={2} gap={1} justifyContent="end">
            <Button variant="outlined" onClick={prompt.close}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={() => mutate()} loading={isLoading}>
              Delete
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
