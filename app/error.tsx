"use client";

interface Props {
  error: unknown;
}

export default function Page({ error }: Props) {
  console.error(error);

  return <h1>500</h1>;
}
