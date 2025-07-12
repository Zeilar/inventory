"use client";

import { Input, InputGroup, Box, CloseButton, Icon } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { type ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";

interface ItemSearchFieldLayoutProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit?: VoidFunction;
  onClear?: VoidFunction;
  isLoading?: boolean;
  search?: string | null;
}

export function ItemSearchFieldLayout({
  onChange,
  onClear,
  onSubmit,
  value,
  isLoading,
  search,
}: ItemSearchFieldLayoutProps) {
  return (
    <Box
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      w={["full", "auto"]}
      h="full"
    >
      <InputGroup
        w={["full", 200]}
        startElement={
          <Icon size="md">
            <MdSearch />
          </Icon>
        }
        endElement={
          (value?.trim() || search) && <CloseButton variant="plain" onClick={onClear} mr={-1.5} />
        }
      >
        <Input
          colorPalette="bg"
          value={value}
          onChange={onChange}
          disabled={isLoading}
          placeholder="Search"
        />
      </InputGroup>
    </Box>
  );
}

export function ItemSearchField() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim() ?? "";
  const [value, setValue] = useState<string>(search);
  const onSubmit = useCallback(
    (v?: string) => {
      if (typeof window === "undefined") {
        return;
      }
      const search = v ?? value.trim();
      if (!search) {
        return;
      }
      const _searchParams = new URLSearchParams(searchParams);
      _searchParams.set("search", search);
      _searchParams.delete("page"); // Always reset to page 1 when searching to avoid empty result.
      push(search ? `?${_searchParams}` : window.location.pathname);
    },
    [value, searchParams, push]
  );

  useEffect(() => {
    setValue(search);
  }, [searchParams, search]);

  return (
    <ItemSearchFieldLayout
      onChange={(e) => setValue(e.target.value)}
      onSubmit={onSubmit}
      value={value}
      onClear={() => {
        onSubmit("");
        setValue("");
        const newSearchParams = new URLSearchParams(searchParams);
        if (!newSearchParams.has("search")) {
          return; // If there was no previous search, there's no reason to push when clearing the field.
        }
        newSearchParams.delete("search");
        push(`/items?${newSearchParams}`);
      }}
      search={search}
    />
  );
}
