import { Link } from "@/components";
import { Item } from "@/features/db/schema";
import { Chip, Skeleton, TableCell, TableRow, Tooltip, Typography } from "@mui/material";

export interface ItemCardLoadingProps {
  isLoading: boolean;
}

export interface ItemCardProps {
  item: Pick<
    Item,
    "id" | "title" | "archived" | "quantity" | "createdAt" | "archivedAt" | "originalPrice"
  >;
}

function isLoadingProps(
  props: ItemCardProps | ItemCardLoadingProps
): props is ItemCardLoadingProps {
  return "isLoading" in props && props.isLoading;
}

export function ItemCard(props: ItemCardProps | ItemCardLoadingProps) {
  const hasLoadingProps = isLoadingProps(props);

  return (
    <TableRow sx={{ p: 1.5 }}>
      <TableCell>{!hasLoadingProps ? props.item.id : <Skeleton />}</TableCell>
      <TableCell>
        {!hasLoadingProps ? (
          <Link href={`/items/${props.item.id}`}>{props.item.title}</Link>
        ) : (
          <Typography>
            <Skeleton />
          </Typography>
        )}
      </TableCell>
      <TableCell align="center">
        {!hasLoadingProps ? (
          props.item.originalPrice
        ) : (
          <Typography>
            <Skeleton />
          </Typography>
        )}
      </TableCell>
      <TableCell align="center">
        {!hasLoadingProps ? (
          props.item.quantity
        ) : (
          <Typography>
            <Skeleton />
          </Typography>
        )}
      </TableCell>
      <TableCell align="center">
        {!hasLoadingProps ? (
          new Date(props.item.createdAt).toLocaleDateString(process.env.NEXT_PUBLIC_LOCALE, {
            timeZone: process.env.TZ,
          })
        ) : (
          <Typography>
            <Skeleton />
          </Typography>
        )}
      </TableCell>
      <TableCell align="center">
        {!hasLoadingProps ? (
          !props.item.archived ? (
            <Chip variant="outlined" label="Published" color="success" />
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
              <Chip variant="outlined" label="Archived" color="warning" />
            </Tooltip>
          )
        ) : (
          <Typography>
            {/* Height should match the chip height. */}
            <Skeleton height={32} />
          </Typography>
        )}
      </TableCell>
    </TableRow>
  );
}
