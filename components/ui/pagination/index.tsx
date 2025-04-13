"use client";

import { Pagination as MuiPagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import type { TransitionStartFunction } from "react";

interface PaginationProps {
  count: number;
  page: number;
  disabled?: boolean;
  startTransition?: TransitionStartFunction;
}

export function Pagination({ count, page, disabled, startTransition }: PaginationProps) {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  return (
    <MuiPagination
      color="primary"
      count={count}
      page={page}
      onChange={(_e, newPage) => {
        // We don't need to do anything if they click on the active page button.
        if (newPage === page) {
          return;
        }

        const _searchParams = new URLSearchParams(searchParams);
        _searchParams.set("page", `${newPage}`);

        function navigate() {
          push(`?${_searchParams}`);
        }

        if (startTransition) {
          startTransition(() => navigate());
        } else {
          navigate();
        }
      }}
      disabled={disabled}
      sx={{ width: "100%" }}
    />
  );
}
