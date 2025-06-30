import type { Params } from "@/app/types";
import { buildAppUrl } from "@/common";
import { A11yBar, Heading } from "@/components";
import type { Item } from "@/features/db/schema";
import { EditItemForm } from "@/features/item/components";
import { Card, Flex } from "@chakra-ui/react";

export default async function Page({ params }: Params<"id">) {
  const { id } = await params;
  const res = await fetch(buildAppUrl(`/api/items/${id}`), {
    next: { revalidate: 31_556_926, tags: [`items-${id}`] },
  });
  const { title, quantity, articleId, files, tags, archived, links, price }: Item =
    await res.json();

  return (
    <Flex flexDir="column" gap={4} m={[4, 8]}>
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
      <Card.Root>
        <Card.Header>
          <Heading size="2xl" as="h2">
            {title}
          </Heading>
        </Card.Header>
        <Card.Body>
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
          />
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}
