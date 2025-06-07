import { Params } from "@/app/types";
import { buildAppUrl } from "@/common";
import { Breadcrumbs } from "@/components";
import type { Item } from "@/features/db/schema";
import { UpdateItemForm } from "@/features/item/components";
import { Box, Divider, Typography } from "@mui/material";

export default async function Page({ params }: Params<"id">) {
  const { id } = await params;
  const res = await fetch(buildAppUrl(`/api/items/${id}`), {
    next: { revalidate: 31_556_926, tags: [`items-${id}`] },
  });
  const { title, quantity, articleId, files, tags, archived, links, originalPrice }: Item =
    await res.json();

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
        <Divider />
        <UpdateItemForm
          articleId={articleId}
          files={files}
          id={parseInt(id)}
          quantity={quantity}
          title={title}
          tags={tags}
          archived={archived}
          links={links}
          originalPrice={originalPrice}
        />
      </Box>
    </div>
  );
}
