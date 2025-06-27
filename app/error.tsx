"use client";

import { A11yBar, Heading } from "@/components";
import { Box, Text } from "@chakra-ui/react";

interface Props {
  error: unknown;
}

export default function Page({ error }: Props) {
  console.error(error);

  return (
    <>
      <A11yBar />
      <Box m={4}>
        <Heading size="6xl" as="h1" color="fg.error">
          500
        </Heading>
        <Text>An internal server error occurred.</Text>
      </Box>
    </>
  );
}
