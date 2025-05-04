import { Params } from "@/app/types";
import { Link } from "@/components";
import type { Item } from "@/features/db/schema";
import { UpdateItemForm } from "@/features/item/components";
import { KeyboardBackspace } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default async function Page({ params }: Params<"id">) {
  const res = await fetch(`http://localhost:3000/api/items/${(await params).id}`);
  const { title, quantity, articleId, files, id }: Item = await res.json();

  return (
    <div>
      <Link
        href={`/items/${id}`}
        sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}
      >
        <KeyboardBackspace />
        <span>Back</span>
      </Link>
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h4">{title}</Typography>
        <UpdateItemForm
          articleId={articleId}
          files={files}
          id={id}
          quantity={quantity}
          title={title}
        />
      </Box>
    </div>
  );
}
