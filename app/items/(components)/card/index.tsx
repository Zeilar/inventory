import { Link, UnstyledLink } from "@/components";
import { DeleteItemButton } from "@/features/item/components";
import { Edit } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent } from "@mui/material";

interface ReceiptCardProps {
  id: number;
  title: string;
}

export function ItemCard({ id, title }: ReceiptCardProps) {
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
        <UnstyledLink href={`/items/${id}/update`}>
          <Button variant="outlined" startIcon={<Edit />}>
            Edit
          </Button>
        </UnstyledLink>
        <DeleteItemButton id={id} />
      </CardActions>
    </Card>
  );
}
