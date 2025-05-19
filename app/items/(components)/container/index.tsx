"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useItemsPageContext } from "../../context";
import { ItemsCardsSkeletons } from "../../loading";
import { ItemCard, type ItemCardProps } from "../card";

interface ItemContainerLayoutProps {
  rows: ItemCardProps[];
}

interface ItemsContainerProps {
  rows: ItemCardProps[];
}

export function ItemsContainerLayout({ rows }: ItemContainerLayoutProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="center" width={75}>
              Quantity
            </TableCell>
            <TableCell align="center" width={150}>
              Deposited
            </TableCell>
            <TableCell align="center" width={100}>
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
