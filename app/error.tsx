"use client";

import { Heading } from "@/components";

interface Props {
  error: unknown;
}

export default function Page({ error }: Props) {
  console.error(error);

  return (
    <Heading size="2xl" as="h2" color="fg.error">
      500
    </Heading>
  );
}
