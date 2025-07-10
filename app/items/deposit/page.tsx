import { A11yBar, Heading } from "@/components";
import { DepositItemForm } from "@/features/item/components";
import { Flex } from "@chakra-ui/react";

export default async function Page() {
  return (
    <Flex flexDir="column" gap={8} m={[4, 8]}>
      <A11yBar
        breadcrumbsProps={{
          hrefs: [{ href: "/", label: "Home" }],
          current: "Deposit",
        }}
      />
      <Heading size="2xl" as="h2">
        Deposit item
      </Heading>
      <DepositItemForm />
    </Flex>
  );
}
