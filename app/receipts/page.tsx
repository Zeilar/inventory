import { imageCardWidth } from "@/common/image";
import { Link } from "@/components";
import type { Receipts } from "@/features/db/schema";
import { CreateForm, UpdateForm } from "@/features/receipt/components";
import { DeleteReceiptButton } from "@/features/receipt/components/delete-button";
import { Box, Card, CardActions, CardContent, Divider } from "@mui/material";
import Image from "next/image";

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/receipts", {
    cache: "force-cache",
    next: {
      revalidate: 31_556_926, // 1 year.
      tags: ["receipts"],
    },
  });
  const receipts: Receipts = await res.json();

  return (
    <Box width="100%">
      <h1>Receipts</h1>
      <CreateForm />
      <Divider />
      <Box
        display="grid"
        gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={2}
      >
        {receipts.map(({ receipts, images }) => {
          console.log(images);
          return (
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
                <CardActions disableSpacing>
                  <UpdateForm id={receipts.id} currentTitle={receipts.title ?? ""} />
                  <DeleteReceiptButton id={receipts.id} />
                </CardActions>
              </Card>
            )
          );
        })}
      </Box>
    </Box>
  );
}
