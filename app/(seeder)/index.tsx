"use client";

import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";
import { install } from "./action";
import { Button, Flex } from "@chakra-ui/react";
import { Heading } from "@/components";
import { MdRocket } from "react-icons/md";

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
    <Flex align="center" flexDir="column" h="100svh" justify="center" gap={8}>
      <Heading size="2xl" as="h2" textAlign="center">
        It looks like this is your first time starting the app.
        <br />
        Click the button below to get started!
      </Heading>
      <Button
        variant="solid"
        loading={isLoading}
        onClick={() => mutate()}
        colorPalette="blue"
        size="xl"
      >
        <MdRocket />
        Install
      </Button>
    </Flex>
  );
}
