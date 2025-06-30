"use client";

import { Heading } from "@/components";
import { Flex } from "@chakra-ui/react";

interface Props {
  error: unknown;
}

export default function Page({ error }: Props) {
  console.error(error);

  return (
    <Flex flexDir="column" gap={4} m={[4, 8]}>
      <Heading size="6xl" as="h1" color="fg.error">
        500
      </Heading>
      <Heading size="lg" as="h5">
        An internal server error occurred.
      </Heading>
    </Flex>
  );
}
