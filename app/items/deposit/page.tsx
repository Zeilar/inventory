import { A11yBar, Heading } from "@/components";
import { DepositItemForm } from "@/features/item/components";
import { Card, Flex } from "@chakra-ui/react";

export default async function Page() {
  return (
    <Flex flexDir="column" gap={4} m={[4, 8]}>
      <A11yBar
        breadcrumbsProps={{
          hrefs: [
            { href: "/", label: "Home" },
            { href: "/items", label: "Items" },
          ],
          current: "Deposit",
        }}
      />
      <Card.Root>
        <Card.Header>
          <Heading size="2xl" as="h2">
            Deposit item
          </Heading>
        </Card.Header>
        <Card.Body>
          <DepositItemForm />
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}
