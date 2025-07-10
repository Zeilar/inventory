import { apiFetch } from "@/app/api/api-fetch";
import type { Params } from "@/app/types";
import { A11yBar, Heading } from "@/components";
import type { Item } from "@/features/db/schema";
import { EditItemForm } from "@/features/item/components";
import { Flex } from "@chakra-ui/react";

export default async function Page({ params }: Params<"id">) {
  const { id } = await params;
  const res = await apiFetch(`/api/items/${id}`, "GET", null, {
    revalidate: 31_556_926,
    tags: [`items-${id}`],
  });
  const { title, quantity, articleId, files, tags, archived, links, price, thumbnail }: Item =
    await res.json();

  return (
    <Flex flexDir="column" gap={8} m={[4, 8]}>
      <A11yBar
        breadcrumbsProps={{
          hrefs: [
            { href: "/", label: "Home" },
            { href: "/items", label: "Items" },
            { href: `/items/${id}`, label: title },
          ],
          current: "Edit",
        }}
      />
      <Heading size="2xl" as="h2">
        {title}
      </Heading>
      <EditItemForm
        articleId={articleId}
        files={files}
        id={parseInt(id)}
        quantity={quantity}
        title={title}
        tags={tags}
        archived={archived}
        links={links}
        price={price}
        thumbnail={thumbnail}
      />
    </Flex>
  );
}
