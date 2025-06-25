import { Heading } from "@/components";
import { Form } from "./form";
import { getSettings } from "../api/settings/getSettings";
import { Card } from "@chakra-ui/react";
import { A11yBar } from "@/components/ui/a11y-bar";

export default async function Page() {
  return (
    <>
      <A11yBar breadcrumbsProps={{ hrefs: [{ href: "/", label: "Home" }], current: "Settings" }} />
      <Card.Root m={4}>
        <Card.Header>
          <Heading size="2xl" as="h2">
            Settings
          </Heading>
        </Card.Header>
        <Card.Body>
          <Form settings={await getSettings()} />
        </Card.Body>
      </Card.Root>
    </>
  );
}
