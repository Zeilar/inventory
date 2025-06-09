"use client";

import {
  Divider,
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
import { ItemCard, type ItemCardProps } from "../card";
import {
  CalendarMonthOutlined,
  NumbersOutlined,
  PublicOutlined,
  SellOutlined,
} from "@mui/icons-material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Link } from "@/components";
import { Fragment } from "react";

interface ItemContainerLayoutProps {
  rows: ItemCardProps[];
  isLoading?: boolean;
}

interface ItemsContainerProps {
  rows: ItemCardProps[];
  isLoading?: boolean;
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

export function ItemsContainerLayout({ rows, isLoading }: ItemContainerLayoutProps) {
  return (
    <>
      <Paper sx={{ display: ["flex", "none"], flexDirection: "column" }}>
        {rows.map(({ item }, i) => (
          <Fragment key={item.id}>
            <Link key={item.id} href={`/items/${item.id}`} sx={{ p: 1.5 }}>
              {item.title}
            </Link>
            {i !== rows.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Paper>
      <TableContainer component={Paper} sx={{ maxHeight: "65svh", display: ["none", "block"] }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell {...headCellProps} width={100}>
                ID
              </TableCell>
              <TableCell {...headCellProps}>Title</TableCell>
              <TableCell {...headCellWithIconProps}>
                <CellIcon icon={SellOutlined} />
                Price
              </TableCell>
              <TableCell {...headCellWithIconProps}>
                <CellIcon icon={NumbersOutlined} />
                Quantity
              </TableCell>
              <TableCell {...headCellWithIconProps}>
                <CellIcon icon={CalendarMonthOutlined} />
                Deposited
              </TableCell>
              <TableCell {...headCellWithIconProps}>
                <CellIcon icon={PublicOutlined} />
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ item }) => (
              <ItemCard key={item.id} item={item} isLoading={isLoading} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

/**
 * Do not use in loading.tsx.
 */
export function ItemsContainer({ rows, isLoading }: ItemsContainerProps) {
  const itemPageContext = useItemsPageContext();

  return <ItemsContainerLayout rows={rows} isLoading={isLoading || itemPageContext.isLoading} />;
}
