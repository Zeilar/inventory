import { Link } from "@/components";
import { DeleteItemButton, UpdateItemForm } from "@/features/item/components";
import { Card, CardActions, CardContent } from "@mui/material";

interface ReceiptCardProps {
  id: number;
  title: string;
  files: string;
  articleId: string | null;
  quantity: number | null;
}

export function ItemCard({ id, title, files, articleId, quantity }: ReceiptCardProps) {
  const url = `/items/${id}`;

  return (
    <Card key={id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <CardContent sx={{ px: 1.5, py: 0 }}>
        <Link
          sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
          href={url}
        >
          {title}
        </Link>
      </CardContent>
      <CardActions sx={{ p: 0.75 }}>
        <UpdateItemForm
          id={id}
          title={title}
          files={files}
          articleId={articleId}
          quantity={quantity}
        />
        <DeleteItemButton id={id} />
      </CardActions>
    </Card>
  );
}
