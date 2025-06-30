"use client";

import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useParams, usePathname, useRouter } from "next/navigation";

interface VersionSelectProps {
  value?: string;
  options: string[]; // Should be `createdAt` column.
}

function renderItem(value: string): string {
  return new Date(value).toLocaleString(process.env.NEXT_PUBLIC_LOCALE);
}

export function VersionSelect({ options, value = options.at(0) ?? "current" }: VersionSelectProps) {
  const { push } = useRouter();
  const collection = createListCollection({ items: ["current", ...options] });
  const { id } = useParams<{ id: string }>();
  const pathname = usePathname();

  return (
    <Select.Root
      w={["full", 250]}
      collection={collection}
      disabled={collection.items.length <= 1}
      value={[value]}
      onValueChange={({ value }) => {
        const version = value.at(0);
        const url =
          !version || version === "current" ? `/items/${id}` : `/items/${id}?version=${value}`;
        if (`${pathname}${window.location.search}` === url) {
          return;
        }
        push(url);
      }}
      colorPalette="teal"
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select version">
            {!value || value === "current" ? "Current" : renderItem(value)}
          </Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {collection.items.map((version) => (
                <Select.Item item={version} key={version}>
                  {version === "current" ? "Current" : renderItem(version)}
                  <Select.ItemIndicator color="teal.fg" />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Control>
    </Select.Root>
  );
}
