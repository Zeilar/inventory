import { imageCardHeight, imageCardWidth } from "@/common/image";
import { Link } from "@/components";
import { DeleteReceiptButton, UpdateReceiptForm } from "@/features/receipt/components";
import { HideImage } from "@mui/icons-material";
import { Box, Card, CardActions, CardContent } from "@mui/material";
import Image from "next/image";

interface ReceiptCardProps {
  id: number;
  title: string;
  imageId: string | undefined;
}

export function ReceiptCard({ id, title, imageId }: ReceiptCardProps) {
  return (
    <Card key={id} sx={{ display: "flex", flexDirection: "column" }}>
      {imageId ? (
        <Image
          src={`/images/${imageId}.jpeg`}
          style={{
            objectFit: "cover",
            aspectRatio: 16 / 9,
            width: "100%",
          }}
          priority
          width={imageCardWidth}
          height={imageCardHeight}
          alt="Receipt"
        />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height={imageCardHeight}
          bgcolor="grey.800"
        >
          <HideImage color="primary" />
        </Box>
      )}
      <CardContent>
        <Link href={`/receipts/${id}`}>{title}</Link>
      </CardContent>
      <CardActions sx={{ mt: "auto", pt: 0 }}>
        <UpdateReceiptForm id={id} currentTitle={title} />
        <DeleteReceiptButton id={id} />
      </CardActions>
    </Card>
  );
}
