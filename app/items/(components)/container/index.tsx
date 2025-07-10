import { getThumbnailPath } from "@/features/item";
import { ItemCard } from "../card";
import { Box } from "@chakra-ui/react";
import { Item } from "@/features/db/schema";

interface ItemContainerLayoutProps {
  rows: Item[];
  isLoading?: boolean;
}

interface ItemsContainerProps {
  rows: Item[];
  isLoading?: boolean;
}

export function ItemsContainerLayout({ rows, isLoading }: ItemContainerLayoutProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
      gap={4}
    >
      {rows.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          thumbnailSrc={item.thumbnail ? getThumbnailPath(item.id, item.thumbnail) : null}
          isLoading={isLoading}
        />
      ))}
    </Box>
  );
}

export function ItemsContainer({ rows, isLoading }: ItemsContainerProps) {
  return <ItemsContainerLayout rows={rows} isLoading={isLoading} />;
}
