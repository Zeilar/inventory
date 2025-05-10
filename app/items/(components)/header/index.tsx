"use client";

import { Pagination, UnstyledLink, type PaginationProps } from "@/components";
import { ItemSearchField } from "@/features/item/components";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useItemsPageContext } from "../../context";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Add, Delete, FilterAlt } from "@mui/icons-material";
import { useDisclosure } from "@/hooks";
import { useSettings } from "@/app/(components)/providers/settings";

interface ItemsHeaderProps {
  page: number;
  count: number;
  disablePagination?: boolean;
}

interface ItemsHeaderLayoutProps {
  paginationProps: PaginationProps;
  searchField: ReactNode;
  onCheckAll?: VoidFunction;
  checked?: number[];
  isLoading?: boolean;
}

export function ItemsHeaderLayout({
  paginationProps,
  searchField,
  checked = [],
  onCheckAll,
  isLoading,
}: ItemsHeaderLayoutProps) {
  const [isFilterOpen, filter] = useDisclosure();
  const { itemsPerPage } = useSettings();

  return (
    <>
      <Breadcrumbs hrefs={[{ href: "/", label: "Home" }]} current="Items" />
      <Typography variant="h4" mt={1.5} mb={3}>
        Items
      </Typography>
      <Box
        position="sticky"
        top={0}
        zIndex={1}
        bgcolor="grey.800"
        width="100%"
        display="flex"
        flexDirection="column"
        borderBottom="1px solid"
        borderColor="divider"
        gap={3}
        pb={3}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={3}>
          <Box mr="auto">
            <Pagination {...paginationProps} />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="end" gap={1.5}>
            {searchField}
            <Button
              variant="outlined"
              startIcon={<FilterAlt />}
              sx={{ height: 40 }}
              onClick={filter.toggle}
            >
              Filter
            </Button>
            <UnstyledLink href="/items/create">
              <Button variant="contained" startIcon={<Add />} sx={{ height: 40 }}>
                Create
              </Button>
            </UnstyledLink>
          </Box>
        </Box>
      </Box>
      <Collapse in={isFilterOpen}>
        <Box py={3} display="grid" gap={3} gridTemplateColumns="175px 350px 1fr">
          <Paper component={FormControl} sx={{ p: 1.5, bgcolor: "transparent" }}>
            <FormLabel sx={{ mb: 0.75 }}>Quantity</FormLabel>
            <Box display="flex" alignItems="center" gap={1.5}>
              <TextField size="small" />
              <span>-</span>
              <TextField size="small" />
            </Box>
          </Paper>
          <Paper component={FormControl} sx={{ p: 1.5, bgcolor: "transparent" }}>
            <FormLabel sx={{ mb: 0.75 }}>Date</FormLabel>
            <Box display="flex" alignItems="center" gap={1.5}>
              <TextField size="small" type="date" />
              <span>-</span>
              <TextField size="small" type="date" />
            </Box>
          </Paper>
          <Paper component={FormControl} sx={{ p: 1.5, bgcolor: "transparent" }}>
            <FormLabel sx={{ mb: 0.75 }}>Tags</FormLabel>
            <Box display="flex" alignItems="center" gap={1.5}>
              WIP
            </Box>
          </Paper>
        </Box>
        <Divider />
      </Collapse>
      <Box display="flex" alignItems="center" justifyContent="space-between" pl={1.5} mt={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked.length === itemsPerPage}
              onChange={onCheckAll}
              disabled={isLoading}
              indeterminate={checked.length > 0 && checked.length < itemsPerPage}
            />
          }
          label={<Typography>{checked.length} selected</Typography>}
          sx={{ ml: 0, gap: 1.5 }} // Override negative margin-left.
        />
        <Button
          variant="outlined"
          disabled={checked.length === 0}
          color="error"
          startIcon={<Delete />}
        >
          Delete
        </Button>
      </Box>
    </>
  );
}

export function ItemsHeader({ count, page, disablePagination }: ItemsHeaderProps) {
  const { isLoading, startTransition, checked, onCheckAll } = useItemsPageContext();

  return (
    <ItemsHeaderLayout
      paginationProps={{
        count,
        page,
        disabled: disablePagination || isLoading,
        startTransition,
      }}
      searchField={<ItemSearchField />}
      checked={checked}
      onCheckAll={onCheckAll}
    />
  );
}
