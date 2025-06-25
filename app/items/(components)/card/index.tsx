import { Link } from "@/components";
import { Item } from "@/features/db/schema";
import { Badge, Table } from "@chakra-ui/react";
import { Skeleton, Tooltip, Typography } from "@mui/material";

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
          <Typography>
            <Skeleton />
          </Typography>
        )}
      </Table.Cell>
      <Table.Cell textAlign="center">
        {!hasLoadingProps ? (
          props.item.price || "-"
        ) : (
          <Typography>
            <Skeleton />
          </Typography>
        )}
      </Table.Cell>
      <Table.Cell textAlign="center">
        {!hasLoadingProps ? (
          props.item.quantity
        ) : (
          <Typography>
            <Skeleton />
          </Typography>
        )}
      </Table.Cell>
      <Table.Cell textAlign="center">
        {!hasLoadingProps ? (
          new Date(props.item.createdAt).toLocaleDateString(process.env.NEXT_PUBLIC_LOCALE, {
            timeZone: process.env.TZ,
          })
        ) : (
          <Typography>
            <Skeleton />
          </Typography>
        )}
      </Table.Cell>
      <Table.Cell textAlign="center">
        {!hasLoadingProps ? (
          !props.item.archived ? (
            <Badge colorPalette="green">Published</Badge>
          ) : (
            <Tooltip
              title={
                props.item.archivedAt
                  ? new Date(props.item.archivedAt).toLocaleDateString(
                      process.env.NEXT_PUBLIC_LOCALE,
                      { timeZone: process.env.TZ }
                    )
                  : null
              }
              placement="top"
              disableInteractive
            >
              <Badge colorPalette="orange">Archived</Badge>
            </Tooltip>
          )
        ) : (
          <Typography>
            {/* Height should match the chip height. */}
            <Skeleton height={32} />
          </Typography>
        )}
      </Table.Cell>
    </Table.Row>
  );
}
