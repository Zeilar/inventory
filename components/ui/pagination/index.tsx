"use client";

import {
  Box,
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
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

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
      variant="ghost"
      disabled={isDisabled}
      // Make it effectively disabled but don't affect styles.
      pointerEvents={pagination.page === page ? "none" : undefined}
      _selected={{ bgColor: "bg.inverted", borderColor: "bg.inverted", color: "fg.inverted" }}
      {...props}
    >
      <UnstyledLink
        href={`?${searchParams}`}
        _selected={{ color: "fg" }}
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
      <ButtonGroup variant="ghost" size="sm" flexWrap="wrap">
        {/* Mobile. */}
        <Box display={["contents", "contents", "contents", "none"]}>
          <ChakraPagination.PrevTrigger asChild>
            <PaginationLink page={Math.max(page - 1, 1)}>
              <IconButton>
                <MdChevronLeft />
              </IconButton>
            </PaginationLink>
          </ChakraPagination.PrevTrigger>
          <ChakraPagination.PageText />
          <ChakraPagination.NextTrigger asChild>
            <PaginationLink page={page + 1}>
              <IconButton>
                <MdChevronRight />
              </IconButton>
            </PaginationLink>
          </ChakraPagination.NextTrigger>
        </Box>

        {/* Desktop. */}
        <Box display={["none", "none", "none", "contents"]}>
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
        </Box>
      </ButtonGroup>
    </ChakraPagination.Root>
  );
}
