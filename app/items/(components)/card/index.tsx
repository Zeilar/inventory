import { SkeletonText, UnstyledLink } from "@/components";
import { Item } from "@/features/db/schema";
import { AbsoluteCenter, Badge, Card, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { MdImageNotSupported, MdNumbers, MdSell } from "react-icons/md";

interface ItemCardProps {
  item: Item;
  isLoading?: boolean;
  thumbnailSrc: string | null;
}

interface ItemCardPreviewProps {
  item: Partial<Item>;
  thumbnailSrc: string | null;
}

export function ItemCardPreview({ item, thumbnailSrc }: ItemCardPreviewProps) {
  return (
    <ItemCardLayout
      thumbnailSrc={thumbnailSrc}
      item={{
        id: 1,
        archivedAt: "",
        articleId: "",
        createdAt: "",
        files: "",
        links: "",
        tags: "",
        thumbnail: "",
        updatedAt: "",
        archived: item.archived ?? true,
        price: item.price ?? "",
        quantity: item.quantity ?? 1,
        title: item.title || "Lorem ipsum dolor",
      }}
    />
  );
}

export function ItemCardLayout({ item, isLoading, thumbnailSrc }: ItemCardProps) {
  const { title, archived, price, quantity } = item;

  return (
    <Card.Root w="full" bgColor="bg.panel" overflow="hidden">
      <Flex
        h={[150, 200, 225, 170]}
        align="center"
        justify="center"
        borderBottom="1px solid {colors.border}"
        pos="relative"
        overflow="hidden"
        bgColor="bg"
      >
        <Badge
          colorPalette={!archived ? "green" : "orange"}
          pos="absolute"
          right={2}
          top={2}
          zIndex={2} // Keep this higher than the image's z-index.
        >
          {!archived ? "Published" : "Archived"}
        </Badge>
        {thumbnailSrc && (
          <Image
            src={thumbnailSrc}
            w="full"
            h="full"
            alt=""
            objectFit="cover"
            zIndex={1} // The z-index is to put it above the placeholder.
          />
        )}
        <AbsoluteCenter>
          <Icon size="2xl" color="fg.muted">
            <MdImageNotSupported />
          </Icon>
        </AbsoluteCenter>
      </Flex>
      <Card.Body>
        <Text truncate>{!isLoading ? title : <SkeletonText />}</Text>
      </Card.Body>
      <Card.Footer gap={6}>
        <Flex align="center" gap={1.5} color="fg.muted">
          <MdSell />
          {price || "-"}
        </Flex>
        <Flex align="center" gap={1.5} color="fg.muted">
          <MdNumbers />
          {quantity}
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
}

export function ItemCard({ item, isLoading, thumbnailSrc }: ItemCardProps) {
  return (
    <UnstyledLink href={`/items/${item.id}`}>
      <ItemCardLayout item={item} isLoading={isLoading} thumbnailSrc={thumbnailSrc} />
    </UnstyledLink>
  );
}
