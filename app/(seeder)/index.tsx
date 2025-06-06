"use client";

import { Rocket } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";
import { install } from "./action";

export function Seeder() {
  const { isLoading, mutate } = useMutation({
    mutationFn: install,
    onSuccess: () => {
      enqueueSnackbar({ variant: "success", message: "Successfully installed app!" });
    },
    onError: (error) => {
      console.error(error);
      enqueueSnackbar({
        variant: "error",
        message: "An unexpected error occurred. Try again.",
      });
    },
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      height="100svh"
      justifyContent="center"
      gap={3}
    >
      <Typography variant="h5">
        It looks like this is your first time starting the app. Click install below to get started!
      </Typography>
      <Button
        startIcon={<Rocket />}
        variant="contained"
        loading={isLoading}
        onClick={() => mutate()}
      >
        Install
      </Button>
    </Box>
  );
}
