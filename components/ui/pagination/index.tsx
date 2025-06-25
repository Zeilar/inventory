"use client";

import {
  ButtonGroup,
  Pagination as ChakraPagination,
  IconButton,
  IconButtonProps,
  usePaginationContext,
} from "@chakra-ui/react";
import { useSettings } from "@/app/(components)/providers/settings";
import { UnstyledLink } from "../link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "next/navigation";

export interface PaginationProps {
  count: number;
  page: number;
  disabled?: boolean;
}

const PaginationLink = ({
  page,
  children,
  disabled,
  ...props
}: IconButtonProps & { page?: "prev" | "next" | number }) => {
  const searchParams = new URLSearchParams(useSearchParams());
  const pagination = usePaginationContext();
  let pageValue: number | string | null | undefined = page;
  if (page === "prev") {
    pageValue = pagination.previousPage;
  }
  if (page === "next") {
    pageValue = pagination.nextPage;
  }
  searchParams.set("page", `${pageValue || 1}`);
  const isDisabled = disabled || !pageValue;

  return (
    <IconButton
      asChild
      outline={0}
      variant="surface"
      disabled={isDisabled}
      // Make it effectively disabled but don't affect styles.
      pointerEvents={pagination.page === page ? "none" : undefined}
      _selected={{ borderColor: "teal.emphasized", bgColor: "teal.subtle" }}
      {...props}
    >
      <UnstyledLink
        href={`?${searchParams}`}
        _selected={{ color: "teal.fg" }}
        pointerEvents={isDisabled ? "none" : undefined}
      >
        {children}
      </UnstyledLink>
    </IconButton>
  );
};

export function Pagination({ count, page, disabled }: PaginationProps) {
  const { itemsPerPage } = useSettings();

  return (
    // The fallback is just to make page 1 button always render.
    <ChakraPagination.Root
      count={count || 1}
      defaultPage={1}
      pageSize={itemsPerPage}
      page={page}
      css={{
        // It acts like a button, but is non-interactive. So let's treat it for what it is; an icon.
        '& [data-part="ellipsis"]': {
          pointerEvents: "none",
        },
      }}
    >
      <ButtonGroup variant="ghost" size="sm">
        <PaginationLink disabled={disabled || !count} page="prev">
          <HiChevronLeft />
        </PaginationLink>
        <ChakraPagination.Items
          render={({ value }) => (
            <PaginationLink disabled={disabled} page={value}>
              {value}
            </PaginationLink>
          )}
        />
        <PaginationLink disabled={disabled || !count} page="next">
          <HiChevronRight />
        </PaginationLink>
      </ButtonGroup>
    </ChakraPagination.Root>
  );
}
