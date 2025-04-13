import { Box } from "@mui/material";
import { SearchParams } from "../types";
import type { GetReceiptsResponse } from "../api/receipts/types";
import { PER_PAGE } from "@/features/receipt/config";
import { ReceiptCard, ReceiptsContainer, ReceiptsHeader } from "./(components)";
import { ReceiptsPageProvider } from "./context";

export default async function Page({ searchParams }: SearchParams<"search" | "page">) {
  const { search = "", page = "1" } = await searchParams;
  const _searchParams = new URLSearchParams({ search, page });

  const res = await fetch(`http://localhost:3000/api/receipts?${_searchParams}`);
  const { receipts, total }: GetReceiptsResponse = await res.json();

  return (
    <ReceiptsPageProvider>
      <Box width="100%">
        <ReceiptsHeader
          count={total ? Math.ceil(total / PER_PAGE) : 1}
          page={total ? parseInt(page) : 1}
        />
        <ReceiptsContainer>
          {receipts.map(
            ({ receipts, images }) =>
              receipts && (
                <ReceiptCard
                  key={receipts.id}
                  id={receipts.id}
                  title={receipts.title}
                  imageId={images?.id}
                />
              )
          )}
        </ReceiptsContainer>
      </Box>
    </ReceiptsPageProvider>
  );
}
