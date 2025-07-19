import { Heading, Panel } from "@/components";
import { Form } from "./form";
import { getSettings } from "../api/settings/getSettings";
import { Flex } from "@chakra-ui/react";
import { A11yBar } from "@/components/ui/a11y-bar";

export default async function Page() {
  return (
    <Flex flexDir="column" gap={8} m={[4, 8]}>
      <A11yBar breadcrumbsProps={{ hrefs: [{ href: "/", label: "Home" }], current: "Settings" }} />
      <Heading size="2xl" as="h2">
        Settings
      </Heading>
      <Panel>
        <Form settings={await getSettings()} />
      </Panel>
    </Flex>
  );
}
