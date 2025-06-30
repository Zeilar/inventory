import { Heading } from "@/components";
import { Flex } from "@chakra-ui/react";

export default function Page() {
  return (
    <Flex flexDir="column" gap={4} m={[4, 8]}>
      <Heading size="6xl" as="h1" color="fg.warning">
        404
      </Heading>
      <Heading size="lg" as="h5">
        That page does not exist.
      </Heading>
    </Flex>
  );
}
