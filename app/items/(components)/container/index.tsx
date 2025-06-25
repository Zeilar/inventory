"use client";

import { ItemCard, type ItemCardProps } from "../card";
import { Link } from "@/components";
import { Fragment } from "react";
import { Card, Flex, Icon, Separator, Table, TableCellProps } from "@chakra-ui/react";
import { MdSell, MdNumbers, MdCalendarMonth, MdPublic } from "react-icons/md";
import type { IconType } from "react-icons/lib";

interface ItemContainerLayoutProps {
  rows: ItemCardProps[];
  isLoading?: boolean;
}

interface ItemsContainerProps {
  rows: ItemCardProps[];
  isLoading?: boolean;
}

interface CellIconProps {
  icon: IconType;
}

function CellIcon({ icon: IconComponent }: CellIconProps) {
  return (
    <Icon mr={1.5} color="teal.solid">
      <IconComponent />
    </Icon>
  );
}

const headCellProps: TableCellProps = {
  bgColor: "gray.subtle",
};

const headCellWithIconProps: TableCellProps = {
  ...headCellProps,
  textAlign: "center",
  width: 135,
};

export function ItemsContainerLayout({ rows, isLoading }: ItemContainerLayoutProps) {
  return (
    <>
      <Card.Root display={["flex", "none"]} flexDir="column">
        <Card.Body>
          {rows.map(({ item }, i) => (
            <Fragment key={item.id}>
              <Link key={item.id} href={`/items/${item.id}`} p={1.5}>
                {item.title}
              </Link>
              {i !== rows.length - 1 && <Separator />}
            </Fragment>
          ))}
        </Card.Body>
      </Card.Root>
      <Table.ScrollArea borderWidth="1px" rounded="sm" maxH="65vh" display={["none", "block"]}>
        <Table.Root size="lg" stickyHeader>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader {...headCellProps} width={100}>
                ID
              </Table.ColumnHeader>
              <Table.ColumnHeader {...headCellProps}>Title</Table.ColumnHeader>
              <Table.ColumnHeader {...headCellWithIconProps}>
                <Flex alignItems="center" justify="center">
                  <CellIcon icon={MdSell} />
                  Price
                </Flex>
              </Table.ColumnHeader>
              <Table.ColumnHeader {...headCellWithIconProps}>
                <Flex alignItems="center" justify="center">
                  <CellIcon icon={MdNumbers} />
                  Quantity
                </Flex>
              </Table.ColumnHeader>
              <Table.ColumnHeader {...headCellWithIconProps}>
                <Flex alignItems="center" justify="center">
                  <CellIcon icon={MdCalendarMonth} />
                  Deposited
                </Flex>
              </Table.ColumnHeader>
              <Table.ColumnHeader {...headCellWithIconProps}>
                <Flex alignItems="center" justify="center">
                  <CellIcon icon={MdPublic} />
                  Status
                </Flex>
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map(({ item }) => (
              <ItemCard key={item.id} item={item} isLoading={isLoading} />
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </>
  );
}

/**
 * Do not use in loading.tsx.
 */
export function ItemsContainer({ rows, isLoading }: ItemsContainerProps) {
  return <ItemsContainerLayout rows={rows} isLoading={isLoading} />;
}
