import { imageCardWidth } from "@/common/image";
import { Link } from "@/components";
import type { Receipts } from "@/features/db/schema";
import { CreateReceiptForm, UpdateReceiptForm } from "@/features/receipt/components";
import { DeleteReceiptButton } from "@/features/receipt/components/delete-button";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { SearchParams } from "../types";
import { ReceiptSearchField } from "@/features/receipt/components/search-field";

export default async function Page({ searchParams }: SearchParams<"search">) {
  const { search } = await searchParams;
  const res = await fetch(`http://localhost:3000/api/receipts?search=${search ?? ""}`, {
    next: !search
      ? {
          revalidate: 31_556_926, // 1 year.
          tags: ["receipts"],
        }
      : undefined,
  });
  const receipts: Receipts = await res.json();

  return (
    <Box width="100%">
      <Box
        p={2}
        display="flex"
        alignContent="center"
        justifyContent="space-between"
        position="sticky"
        bgcolor="common.black"
        borderBottom="2px solid"
        borderColor="divider"
        top={0}
      >
        <Typography variant="h4">Receipts</Typography>
        <Box display="flex" alignItems="center" width="100%" justifyContent="end" gap={1}>
          <ReceiptSearchField />
          <CreateReceiptForm />
        </Box>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={2}
        p={2}
        overflow="auto"
      >
        {receipts.map(
          ({ receipts, images }) =>
            receipts && (
              <Card key={receipts.id}>
                <Image
                  src={images ? `/images/${images.id}.jpeg` : "/image-card-placeholder.svg"}
                  style={{ objectFit: "cover", aspectRatio: 16 / 9, width: "100%" }}
                  priority
                  width={imageCardWidth}
                  height={(9 / 16) * imageCardWidth}
                  alt="Receipt"
                />
                <CardContent>
                  <Link href={`/receipts/${receipts.id}`}>{receipts.title}</Link>
                </CardContent>
                <CardActions>
                  <UpdateReceiptForm id={receipts.id} currentTitle={receipts.title} />
                  <DeleteReceiptButton id={receipts.id} />
                </CardActions>
              </Card>
            )
        )}
      </Box>
    </Box>
  );
}
