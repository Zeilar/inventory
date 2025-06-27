import { A11yBar, Heading } from "@/components";
import { CreateItemForm } from "@/features/item/components";
import { Card, Flex } from "@chakra-ui/react";

export default async function Page() {
  return (
    <Flex flexDir="column" gap={2} m={4}>
      <A11yBar
        breadcrumbsProps={{
          hrefs: [
            { href: "/", label: "Home" },
            { href: "/items", label: "Items" },
          ],
          current: "Create",
        }}
      />
      <Card.Root>
        <Card.Header>
          <Heading size="2xl" as="h2">
            Create item
          </Heading>
        </Card.Header>
        <Card.Body>
          <CreateItemForm />
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}
