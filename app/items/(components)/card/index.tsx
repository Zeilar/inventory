import { Link } from "@/components";
import { Item } from "@/features/db/schema";
import { CalendarMonth, Numbers } from "@mui/icons-material";
import { Chip, TableCell, TableRow, Tooltip } from "@mui/material";

export type ItemCardProps = Pick<
  Item,
  "id" | "title" | "archived" | "quantity" | "createdAt" | "archivedAt"
>;

export function ItemCard({ id, title, archived, createdAt, quantity, archivedAt }: ItemCardProps) {
  return (
    <TableRow key={id} sx={{ p: 1.5 }}>
      <TableCell>{id}</TableCell>
      <TableCell>
        <Link href={`/items/${id}`}>{title}</Link>
      </TableCell>
      <TableCell align="center">
        <Chip label={quantity} icon={<Numbers fontSize="small" />} />
      </TableCell>
      <TableCell align="center">
        <Chip
          label={new Date(createdAt).toLocaleDateString()}
          icon={<CalendarMonth fontSize="small" />}
        />
      </TableCell>
      <TableCell align="center">
        {!archived ? (
          <Chip variant="outlined" label="Published" color="success" />
        ) : (
          <Tooltip
            title={new Date(archivedAt ?? "").toLocaleDateString()}
            placement="top"
            disableInteractive
          >
            <Chip variant="outlined" label="Archived" color="warning" />
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
}
