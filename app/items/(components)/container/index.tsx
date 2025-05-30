"use client";

import {
  Paper,
  SvgIconTypeMap,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useItemsPageContext } from "../../context";
import { ItemsCardsSkeletons } from "../../loading";
import { ItemCard, type ItemCardProps } from "../card";
import { CalendarMonth, Numbers, Public } from "@mui/icons-material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface ItemContainerLayoutProps {
  rows: ItemCardProps[];
}

interface ItemsContainerProps {
  rows: ItemCardProps[];
}

interface CellIconProps {
  icon: OverridableComponent<SvgIconTypeMap<Record<never, never>, "svg">> & {
    muiName: string;
  };
}

function CellIcon({ icon: Icon }: CellIconProps) {
  return <Icon fontSize="small" sx={{ verticalAlign: "middle", mr: 0.75 }} color="primary" />;
}

const headCellProps: TableCellProps = {
  sx: { bgcolor: "grey.600" },
};

const headCellWithIconProps: TableCellProps = {
  ...headCellProps,
  align: "center",
  width: 135,
};

export function ItemsContainerLayout({ rows }: ItemContainerLayoutProps) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: "65svh" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell {...headCellProps}>ID</TableCell>
            <TableCell {...headCellProps}>Title</TableCell>
            <TableCell {...headCellWithIconProps}>
              <CellIcon icon={Numbers} />
              Quantity
            </TableCell>
            <TableCell {...headCellWithIconProps}>
              <CellIcon icon={CalendarMonth} />
              Deposited
            </TableCell>
            <TableCell {...headCellWithIconProps}>
              <CellIcon icon={Public} />
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <ItemCard key={row.id} {...row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/**
 * Do not use in loading.tsx.
 */
export function ItemsContainer({ rows }: ItemsContainerProps) {
  const { isLoading } = useItemsPageContext();

  return (
    <ItemsContainerLayout rows={rows}>
      {/* {!isLoading ? children : <ItemsCardsSkeletons />} */}
    </ItemsContainerLayout>
  );
}
