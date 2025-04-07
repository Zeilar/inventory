import { imageCardHeight, imageCardWidth } from "@/common/image";
import { Link } from "@/components";
import { DeleteReceiptButton, UpdateReceiptForm } from "@/features/receipt/components";
import { Card, CardActions, CardContent } from "@mui/material";
import Image from "next/image";

interface ReceiptCardProps {
  id: number;
  title: string;
  hasImage: boolean;
}

export function ReceiptCard({ id, title, hasImage }: ReceiptCardProps) {
  return (
    <Card key={id} sx={{ display: "flex", flexDirection: "column" }}>
      <Image
        src={hasImage ? `/images/${id}.jpeg` : "/image-card-placeholder.svg"}
        style={{ objectFit: "cover", aspectRatio: 16 / 9, width: "100%" }}
        priority
        width={imageCardWidth}
        height={imageCardHeight}
        alt="Receipt"
      />
      <CardContent>
        <Link href={`/receipts/${id}`}>{title}</Link>
      </CardContent>
      <CardActions sx={{ mt: "auto" }}>
        <UpdateReceiptForm id={id} currentTitle={title} />
        <DeleteReceiptButton id={id} />
      </CardActions>
    </Card>
  );
}
