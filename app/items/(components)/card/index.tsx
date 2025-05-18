"use client";

import { Link, UnstyledLink } from "@/components";
import { ArchiveItemButton } from "@/features/item/components";
import { Edit } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Checkbox } from "@mui/material";
import { useItemsPageContext } from "../../context";

interface ItemCardProps {
  id: number;
  title: string;
  archived: boolean;
}

export function ItemCard({ id, title, archived }: ItemCardProps) {
  const { checked, onCheck } = useItemsPageContext();
  const url = `/items/${id}`;

  return (
    <Card key={id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <CardContent
        sx={{ p: 1.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
      >
        <Checkbox sx={{ mr: 1.5 }} checked={checked.includes(id)} onChange={() => onCheck(id)} />
        <Link href={url}>{title}</Link>
      </CardContent>
      <CardActions sx={{ p: 1.5, gap: 0.75 }}>
        <UnstyledLink href={`${url}/update`}>
          <Button variant="outlined" startIcon={<Edit />}>
            Edit
          </Button>
        </UnstyledLink>
        <ArchiveItemButton ids={[id]} archived={archived} />
      </CardActions>
    </Card>
  );
}
