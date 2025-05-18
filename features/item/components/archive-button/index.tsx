"use client";

import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";
import { toggleItemArchive } from "./action";
import { Archive } from "@mui/icons-material";

interface DeleteItemButtonProps {
  ids: number[];
  archived: boolean;
  onSuccess?: VoidFunction;
}

export function ArchiveItemButton({ ids, archived, onSuccess }: DeleteItemButtonProps) {
  const { isLoading, mutate } = useMutation({
    mutationFn: () => toggleItemArchive(ids),
    onSuccess: (result) => {
      const newArchivedStatus = result.at(0);
      if (newArchivedStatus == null) {
        enqueueSnackbar({
          variant: "error",
          message: "An unexpected error occurred.",
        });
        return;
      }
      enqueueSnackbar({
        variant: "success",
        message: `${newArchivedStatus ? "Archived" : "Unarchived"} item.`,
      });
      onSuccess?.();
    },
  });

  return (
    <Button
      variant="outlined"
      startIcon={<Archive />}
      color="warning"
      onClick={() => mutate()}
      loading={isLoading}
    >
      {!archived ? "Archive" : "Unarchive"}
    </Button>
  );
}
