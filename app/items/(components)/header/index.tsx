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
  Typography,
} from "@mui/material";
import { useItemsPageContext } from "../../context";
import { useCallback, type ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Add, Delete, FilterAlt } from "@mui/icons-material";
import { useAppForm, useDisclosure } from "@/hooks";
import { useSettings } from "@/app/(components)/providers/settings";
import { useRouter, useSearchParams } from "next/navigation";
import type { ItemsFilterParams, ItemsSearchParams } from "@/app/api/items/route";

interface ItemsHeaderProps {
  page: number;
  count: number;
  disablePagination?: boolean;
  hasResults: boolean;
}

interface ItemsHeaderLayoutProps {
  paginationProps: PaginationProps;
  searchField: ReactNode;
  onCheckAll?: VoidFunction;
  checked?: number[];
  isLoading?: boolean;
  hasResults: boolean;
}

const filters: ItemsFilterParams[] = ["dateFrom", "dateTo", "quantityFrom", "quantityTo"];

const defaultValues = Object.fromEntries(filters.map((filter) => [filter, ""])) as Record<
  ItemsFilterParams,
  string
>;

export function ItemsHeaderLayout({
  paginationProps,
  searchField,
  checked = [],
  onCheckAll,
  isLoading,
  hasResults,
}: ItemsHeaderLayoutProps) {
  const { refresh } = useRouter();
  const searchParams = useSearchParams();
  const { itemsPerPage } = useSettings();
  const form = useAppForm({
    defaultValues: Object.fromEntries(
      Object.entries(defaultValues).map(([filter]) => [filter, searchParams.get(filter) ?? ""])
    ) as Record<ItemsFilterParams, string>,
    onSubmit: refresh,
  });
  /**
   * Filters should start expanded if there are one(s) already in the URL.
   */
  const [isFilterOpen, filter] = useDisclosure(Object.values(form.state.values).some(Boolean));
  const shallowPushQueryParams = useCallback((param: ItemsSearchParams, value: string): void => {
    // Do not use `useSearchParams` as it doesn't update when using `window.history.pushState`.
    const newSearchParams = new URLSearchParams(window.location.search);
    if (value) {
      newSearchParams.set(param, value);
    } else {
      newSearchParams.delete(param);
    }
    window.history.pushState(null, "", `?${newSearchParams}`);
  }, []);

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
        <form.AppForm>
          <form.Form display="flex" flexDirection="column" gap={3} py={3}>
            <Box display="grid" gap={3} gridTemplateColumns="200px 350px 1fr">
              <FormControl sx={{ bgcolor: "transparent" }}>
                <FormLabel sx={{ mb: 1.5 }}>Quantity</FormLabel>
                <Box display="flex" gap={1.5}>
                  <form.AppField
                    name="quantityFrom"
                    validators={{
                      onChange: ({ value }) =>
                        parseInt(value) < 0 ? "Must not be a negative number." : undefined,
                    }}
                    listeners={{
                      onChange: ({ value }) => shallowPushQueryParams("quantityFrom", value),
                    }}
                  >
                    {(field) => (
                      <field.TextField
                        type="number"
                        label="From"
                        slotProps={{ htmlInput: { min: 0 } }}
                      />
                    )}
                  </form.AppField>
                  <span>-</span>
                  <form.AppField
                    name="quantityTo"
                    validators={{
                      onChange: ({ value }) =>
                        parseInt(value) < 0 ? "Must not be a negative number." : undefined,
                    }}
                    listeners={{
                      onChange: ({ value }) => shallowPushQueryParams("quantityTo", value),
                    }}
                  >
                    {(field) => (
                      <field.TextField
                        type="number"
                        label="To"
                        slotProps={{ htmlInput: { min: 0 } }}
                      />
                    )}
                  </form.AppField>
                </Box>
              </FormControl>
              <FormControl sx={{ bgcolor: "transparent" }}>
                <FormLabel sx={{ mb: 1.5 }}>Date</FormLabel>
                <Box display="flex" gap={1.5}>
                  <form.AppField
                    name="dateFrom"
                    listeners={{
                      onChange: ({ value }) => shallowPushQueryParams("dateFrom", value),
                    }}
                  >
                    {(field) => (
                      <field.TextField
                        type="date"
                        label="From"
                        slotProps={{ inputLabel: { shrink: true } }}
                      />
                    )}
                  </form.AppField>
                  <span>-</span>
                  <form.AppField
                    name="dateTo"
                    listeners={{
                      onChange: ({ value }) => shallowPushQueryParams("dateTo", value),
                    }}
                  >
                    {(field) => (
                      <field.TextField
                        type="date"
                        label="To"
                        slotProps={{ inputLabel: { shrink: true } }}
                      />
                    )}
                  </form.AppField>
                </Box>
              </FormControl>
              <FormControl sx={{ bgcolor: "transparent" }}>
                <FormLabel sx={{ mb: 1.5 }}>Tags</FormLabel>
                <Box display="flex" gap={1.5}>
                  WIP
                </Box>
              </FormControl>
            </Box>
            <Box display="flex" gap={1.5}>
              <form.SubmitButton sx={{ width: "fit-content" }}>Apply</form.SubmitButton>
              <Button
                variant="outlined"
                type="button"
                onClick={() => {
                  Object.keys(defaultValues).forEach((element) => {
                    shallowPushQueryParams(element as ItemsFilterParams, "");
                  });
                  form.reset(defaultValues, { keepDefaultValues: false });
                }}
              >
                Clear
              </Button>
            </Box>
          </form.Form>
        </form.AppForm>
        <Divider />
      </Collapse>
      <Box display="flex" alignItems="center" justifyContent="space-between" pl={1.5} mt={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked.length === itemsPerPage}
              onChange={onCheckAll}
              disabled={isLoading || !hasResults}
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

export function ItemsHeader({ count, page, disablePagination, hasResults }: ItemsHeaderProps) {
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
      hasResults={hasResults}
    />
  );
}
