import { Link, Tooltip } from "@/components";
import { Item } from "@/features/db/schema";
import { Badge, Skeleton, Table, Text } from "@chakra-ui/react";

export interface ItemCardLoadingProps {
  isLoading: boolean;
}

export interface ItemCardProps {
  item: Pick<Item, "id" | "title" | "archived" | "quantity" | "createdAt" | "archivedAt" | "price">;
}

function isLoadingProps(
  props: ItemCardProps | ItemCardLoadingProps
): props is ItemCardLoadingProps {
  return "isLoading" in props && props.isLoading;
}

export function ItemCard(props: ItemCardProps | ItemCardLoadingProps) {
  const hasLoadingProps = isLoadingProps(props);

  return (
    <Table.Row p={2} bgColor="bg.subtle" _last={{ "& td": { borderBottom: 0 } }}>
      <Table.Cell>{!hasLoadingProps ? props.item.id : <Skeleton />}</Table.Cell>
      <Table.Cell>
        {!hasLoadingProps ? (
          <Link href={`/items/${props.item.id}`}>{props.item.title}</Link>
        ) : (
          <Text>
            <Skeleton />
          </Text>
        )}
      </Table.Cell>
      <Table.Cell textAlign="center">
        {!hasLoadingProps ? (
          props.item.price || "-"
        ) : (
          <Text>
            <Skeleton />
          </Text>
        )}
      </Table.Cell>
      <Table.Cell textAlign="center">
        {!hasLoadingProps ? (
          props.item.quantity
        ) : (
          <Text>
            <Skeleton />
          </Text>
        )}
      </Table.Cell>
      <Table.Cell textAlign="center">
        {!hasLoadingProps ? (
          new Date(props.item.createdAt).toLocaleDateString(process.env.NEXT_PUBLIC_LOCALE, {
            timeZone: process.env.TZ,
          })
        ) : (
          <Text>
            <Skeleton />
          </Text>
        )}
      </Table.Cell>
      <Table.Cell textAlign="center">
        {!hasLoadingProps ? (
          !props.item.archived ? (
            <Badge colorPalette="green">Published</Badge>
          ) : (
            <Tooltip
              content={
                props.item.archivedAt
                  ? new Date(props.item.archivedAt).toLocaleDateString(
                      process.env.NEXT_PUBLIC_LOCALE,
                      { timeZone: process.env.TZ }
                    )
                  : null
              }
            >
              <Badge colorPalette="orange">Archived</Badge>
            </Tooltip>
          )
        ) : (
          <Text>
            {/* Height should match the chip height. */}
            <Skeleton height={32} />
          </Text>
        )}
      </Table.Cell>
    </Table.Row>
  );
}
