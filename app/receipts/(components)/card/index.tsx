import { imageCardHeight, imageCardWidth } from "@/common/image";
import { getImageSrc } from "@/common/image/path";
import { ImagePlaceholder, Link, UnstyledLink } from "@/components";
import { DeleteReceiptButton, UpdateReceiptForm } from "@/features/receipt/components";
import { ButtonBase, Card, CardActions, CardContent } from "@mui/material";
import Image from "next/image";

interface ReceiptCardProps {
  id: number;
  title: string;
  imageId: string | undefined;
}

export function ReceiptCard({ id, title, imageId }: ReceiptCardProps) {
  const url = `/receipts/${id}`;

  return (
    <Card key={id} sx={{ display: "flex", flexDirection: "column" }}>
      <UnstyledLink href={url}>
        <ButtonBase sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, width: "100%" }}>
          {imageId ? (
            <Image
              src={getImageSrc(imageId)}
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
            <ImagePlaceholder height={imageCardHeight} />
          )}
        </ButtonBase>
      </UnstyledLink>
      <CardContent>
        <Link href={url}>{title}</Link>
      </CardContent>
      <CardActions sx={{ mt: "auto", pt: 0 }}>
        <UpdateReceiptForm id={id} currentTitle={title} imageId={imageId} />
        <DeleteReceiptButton id={id} />
      </CardActions>
    </Card>
  );
}
