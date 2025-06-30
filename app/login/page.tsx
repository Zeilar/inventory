"use client";

import { useAppForm } from "@/hooks";
import type { AuthRequestDto } from "../api/auth/route";
import { A11yBar, Heading } from "@/components";
import { Card, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { push } = useRouter();
  const form = useAppForm({
    defaultValues: { password: "" } satisfies AuthRequestDto,
    onSubmit: async ({ value, formApi }) => {
      const res = await fetch("/api/auth", { method: "POST", body: JSON.stringify(value) });
      if (!res.ok) {
        formApi.setFieldMeta("password", (p) => ({
          ...p,
          errorMap: { onChange: "Incorrect password." },
        }));
        return;
      }
      push("/");
    },
  });

  return (
    <Flex m={[4, 8]} flexDir="column" gap={4}>
      <A11yBar breadcrumbsProps={{ current: "Login" }} />
      <Card.Root>
        <Card.Header>
          <Heading size="2xl" as="h2">
            Login
          </Heading>
        </Card.Header>
        <Card.Body>
          <form.AppForm>
            <form.Form display="flex" flexDir="column" gap={4}>
              <form.AppField
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) {
                      return "Field is required.";
                    }
                  },
                }}
              >
                {(field) => (
                  <field.Field w={200} label="Password" placeholder="••••••••" type="password" />
                )}
              </form.AppField>
              <form.SubmitButton w="fit">Login</form.SubmitButton>
            </form.Form>
          </form.AppForm>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}
