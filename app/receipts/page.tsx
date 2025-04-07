import { Pagination } from "@/components";
import { Alert, Box } from "@mui/material";
import { SearchParams } from "../types";
import type { GetReceiptsResponse } from "../api/receipts/types";
import { PER_PAGE } from "@/features/receipt/config";
import { ReceiptCard, ReceiptsContainer, ReceiptsHeader } from "./(components)";

export default async function Page({ searchParams }: SearchParams<"search" | "page">) {
  const { search = "", page = "1" } = await searchParams;
  const _searchParams = new URLSearchParams({ search, page });

  const res = await fetch(`http://localhost:3000/api/receipts?${_searchParams}`);
  const { receipts, total }: GetReceiptsResponse = await res.json();

  return (
    <Box width="100%">
      <ReceiptsHeader />
      {total ? (
        <Pagination count={Math.ceil(total / PER_PAGE)} page={parseInt(page)} />
      ) : (
        <Pagination count={1} page={1} disabled />
      )}
      <ReceiptsContainer>
        {receipts.length === 0 && search && <Alert severity="info">No results for: {search}</Alert>}
        {receipts.map(
          ({ receipts, images }) =>
            receipts && (
              <ReceiptCard
                key={receipts.id}
                id={receipts.id}
                title={receipts.title}
                hasImage={Boolean(images)}
              />
            )
        )}
      </ReceiptsContainer>
    </Box>
  );
}
