import { Params } from "@/app/types";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { Item } from "@/features/db/schema";
import { UpdateItemForm } from "@/features/item/components";
import { Box, Typography } from "@mui/material";

export default async function Page({ params }: Params<"id">) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/items/${id}`, {
    next: { revalidate: 31_556_926, tags: [`items-${id}`] },
  });
  const { title, quantity, articleId, files }: Item = await res.json();

  return (
    <div>
      <Box mb={1.5}>
        <Breadcrumbs
          hrefs={[
            { href: "/", label: "Home" },
            { href: "/items", label: "Items" },
            { href: `/items/${id}`, label: title },
          ]}
          current="Update"
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h4">{title}</Typography>
        <UpdateItemForm
          articleId={articleId}
          files={files}
          id={parseInt(id)}
          quantity={quantity}
          title={title}
        />
      </Box>
    </div>
  );
}
