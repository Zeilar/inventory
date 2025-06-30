"use client";

import { A11yBar, Heading } from "@/components";
import { Flex } from "@chakra-ui/react";

interface Props {
  error: unknown;
}

export default function Page({ error }: Props) {
  console.error(error);

  return (
    <Flex flexDir="column" gap={4} m={[4, 8]}>
      <A11yBar breadcrumbsProps={{ current: "500" }} />
      <div>
        <Heading size="6xl" as="h1" color="fg.error">
          500
        </Heading>
        <Heading size="lg" as="h5">
          An internal server error occurred.
        </Heading>
      </div>
    </Flex>
  );
}
