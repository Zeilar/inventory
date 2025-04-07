"use client";

import { Pagination as MuiPagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  count: number;
  page: number;
  disabled?: boolean;
}

export function Pagination({ count, page, disabled }: PaginationProps) {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  return (
    <MuiPagination
      color="primary"
      count={count}
      page={page}
      onChange={(_e, newPage) => {
        const _searchParams = new URLSearchParams(searchParams);
        _searchParams.set("page", `${newPage}`);
        push(`?${_searchParams}`);
      }}
      disabled={disabled}
    />
  );
}
