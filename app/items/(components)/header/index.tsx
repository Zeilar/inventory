"use client";

import { Pagination, UnstyledLink, type PaginationProps } from "@/components";
import { ItemSearchField } from "@/features/item/components";
import {
  Box,
  Button,
  capitalize,
  Divider,
  Drawer,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useItemsPageContext } from "../../context";
import { Suspense, type ReactNode } from "react";
import { Breadcrumbs } from "@/components";
import { Add, Close, FilterAlt } from "@mui/icons-material";
import { useAppForm, useDisclosure } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import type { ItemsFilterParams, SortDirection } from "@/app/api/items/route";
import { Item } from "@/features/db/schema";
import { SIDEBAR_WIDTH } from "@/features/theme";
import isEqual from "lodash/isEqual";

interface ItemsHeaderProps {
  page: number;
  count: number;
  disablePagination?: boolean;
}

interface ItemsHeaderLayoutProps {
  paginationProps: PaginationProps;
  searchField: ReactNode;
}

type DefaultValues = Record<ItemsFilterParams, string>;

const defaultValues: DefaultValues = {
  quantityFrom: "",
  quantityTo: "",
  dateFrom: "",
  dateTo: "",
  status: "published",
  tags: "",
  sortBy: "id" satisfies keyof Item,
  sortDirection: "desc" satisfies SortDirection,
};

function renderSortLabel(property: keyof Item, direction: SortDirection): string {
  switch (property) {
    case "id":
      return direction === "asc" ? "Oldest" : "Newest";
    case "quantity":
      return `Quantity (${direction === "asc" ? "lowest" : "highest"})`;
    case "title":
      return `Title (${direction === "asc" ? "A-Z" : "Z-A"})`;
    case "updatedAt":
      return `Updated (${direction === "asc" ? "oldest" : "newest"})`;
    case "createdAt":
      return `Deposited (${direction === "asc" ? "oldest" : "newest"})`;
    case "archivedAt":
      return `Archived (${direction === "asc" ? "oldest" : "newest"})`;
    default:
      return `${capitalize(property)} ${direction === "asc" ? "min - max" : "max - min"}`;
  }
}

export function ItemsHeaderLayout({ paginationProps, searchField }: ItemsHeaderLayoutProps) {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const form = useAppForm({
    defaultValues: Object.fromEntries(
      Object.entries(defaultValues).map(([filter, defaultValue]) => [
        filter,
        searchParams.get(filter) ?? defaultValue,
      ])
    ) as DefaultValues,
    onSubmit: ({ value }) => {
      const newSearchParams = new URLSearchParams(searchParams);
      for (const property in value) {
        const param = value[property as keyof typeof value];
        if (!param) {
          continue;
        }
        newSearchParams.set(property, param);
      }
      push(`?${newSearchParams}`);
    },
    validators: {
      onChange: ({ value, formApi }) => {
        if (value.status !== "published" || value.sortBy !== ("archivedAt" satisfies keyof Item)) {
          return;
        }
        formApi.setFieldValue("sortBy", "id" satisfies keyof Item);
        formApi.setFieldValue("sortDirection", "desc" satisfies SortDirection);
      },
    },
  });
  /**
   * Filters should start expanded if there are one(s) already in the URL.
   */
  const [isFilterOpen, filter] = useDisclosure(!isEqual(defaultValues, form.state.values));

  return (
    <form.AppForm>
      <Breadcrumbs hrefs={[{ href: "/", label: "Home" }]} current="Items" />
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={3}>
        <Typography variant="h4" mt={1.5} mb={3}>
          Items
        </Typography>
        <UnstyledLink href="/items/create">
          <Button variant="contained" startIcon={<Add />}>
            Create
          </Button>
        </UnstyledLink>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Box display="flex" flexDirection="column" gap={3} mb={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={3}>
          <Box mr="auto">
            <Pagination {...paginationProps} />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="end" gap={1.5}>
            <Button
              color="primary"
              variant="outlined"
              startIcon={!isFilterOpen ? <FilterAlt /> : <Close />}
              sx={{ height: 40 }}
              onClick={filter.toggle}
            >
              Filter
            </Button>
            {searchField}
            <form.AppField name="sortBy" validators={{ onChangeListenTo: ["status"] }}>
              {(field) => (
                <Select
                  sx={{ width: 250 }}
                  value={`${field.state.value || "id"},${
                    form.getFieldValue("sortDirection") || "desc"
                  }`}
                  size="small"
                  renderValue={(value) => {
                    const [sortBy, sortDirection] = value.split(",");
                    return renderSortLabel(sortBy as keyof Item, sortDirection as SortDirection);
                  }}
                  onChange={(e) => {
                    const { value } = e.target;
                    const [sortBy, sortDirection] = value.split(",");
                    field.handleChange(sortBy);
                    form.setFieldValue("sortDirection", sortDirection);
                    form.handleSubmit();
                  }}
                >
                  <MenuItem value="id,desc">{renderSortLabel("id", "desc")}</MenuItem>
                  <MenuItem value="id,asc">{renderSortLabel("id", "asc")}</MenuItem>
                  <MenuItem value="quantity,asc">{renderSortLabel("quantity", "asc")}</MenuItem>
                  <MenuItem value="quantity,desc">{renderSortLabel("quantity", "desc")}</MenuItem>
                  <MenuItem value="title,asc">{renderSortLabel("title", "asc")}</MenuItem>
                  <MenuItem value="title,desc">{renderSortLabel("title", "desc")}</MenuItem>
                  <MenuItem value="createdAt,desc">{renderSortLabel("createdAt", "desc")}</MenuItem>
                  <MenuItem value="createdAt,asc">{renderSortLabel("createdAt", "asc")}</MenuItem>
                  <MenuItem
                    value="archivedAt,desc"
                    disabled={form.getFieldValue("status") === "published"}
                  >
                    {renderSortLabel("archivedAt", "desc")}
                  </MenuItem>
                  <MenuItem
                    value="archivedAt,asc"
                    disabled={form.getFieldValue("status") === "published"}
                  >
                    {renderSortLabel("archivedAt", "asc")}
                  </MenuItem>
                  <MenuItem value="updatedAt,desc">{renderSortLabel("updatedAt", "desc")}</MenuItem>
                  <MenuItem value="updatedAt,asc">{renderSortLabel("updatedAt", "asc")}</MenuItem>
                </Select>
              )}
            </form.AppField>
          </Box>
        </Box>
      </Box>
      <Drawer
        open={isFilterOpen}
        onClose={filter.close}
        slotProps={{ paper: { sx: { borderBottom: 0, borderTop: 0, borderLeft: 0 } } }}
        variant="persistent"
      >
        <form.Form display="flex" flexDirection="column" gap={3} p={3} width={SIDEBAR_WIDTH}>
          <Box display="flex" gap={3} justifyContent="space-between">
            <Typography variant="h4">Filters</Typography>
            <IconButton onClick={filter.close}>
              <Close />
            </IconButton>
          </Box>
          <Divider />
          <form.AppField name="status">
            {(field) => (
              <FormControl>
                <FormLabel sx={{ mb: 0.75 }}>Status</FormLabel>
                <ToggleButtonGroup
                  color="primary"
                  value={field.state.value}
                  exclusive
                  onChange={(_e, value: string) => {
                    if (value == null) {
                      return;
                    }
                    field.handleChange(value);
                  }}
                >
                  <ToggleButton value="published" color="success">
                    Published
                  </ToggleButton>
                  <ToggleButton value="archived" color="warning">
                    Archived
                  </ToggleButton>
                  <ToggleButton value="all">All</ToggleButton>
                </ToggleButtonGroup>
              </FormControl>
            )}
          </form.AppField>
          <Divider />
          <FormControl sx={{ bgcolor: "transparent" }}>
            <FormLabel sx={{ mb: 0.75 }}>Quantity</FormLabel>
            <Box display="flex" gap={1.5} alignItems="center">
              <form.AppField
                name="quantityFrom"
                validators={{
                  onChange: ({ value }) =>
                    parseInt(value) < 0 ? "Must not be a negative number." : undefined,
                }}
              >
                {(field) => <field.TextField type="number" slotProps={{ htmlInput: { min: 0 } }} />}
              </form.AppField>
              <span>-</span>
              <form.AppField
                name="quantityTo"
                validators={{
                  onChange: ({ value }) =>
                    parseInt(value) < 0 ? "Must not be a negative number." : undefined,
                }}
              >
                {(field) => <field.TextField type="number" slotProps={{ htmlInput: { min: 0 } }} />}
              </form.AppField>
            </Box>
          </FormControl>
          <Divider />
          <FormControl sx={{ bgcolor: "transparent" }}>
            <FormLabel sx={{ mb: 0.75 }}>Date</FormLabel>
            <Box display="flex" gap={1.5} flexDirection="column" alignItems="center">
              <form.AppField name="dateFrom">
                {(field) => (
                  <field.TextField
                    type="datetime-local"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                )}
              </form.AppField>
              <span>to</span>
              <form.AppField name="dateTo">
                {(field) => (
                  <field.TextField
                    type="datetime-local"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                )}
              </form.AppField>
            </Box>
          </FormControl>
          <Divider />
          <Box width="100%">
            <form.AppField name="tags">
              {(field) => (
                <FormControl sx={{ bgcolor: "transparent" }} fullWidth>
                  <FormLabel sx={{ mb: 0.75 }}>Tags</FormLabel>
                  <field.TagsField />
                </FormControl>
              )}
            </form.AppField>
          </Box>
          <Divider />
          <Box display="flex" gap={1.5}>
            <form.SubmitButton size="medium">Apply</form.SubmitButton>
            <Button
              variant="outlined"
              color="primary"
              type="button"
              onClick={() => {
                form.reset(defaultValues);
                push("/items");
              }}
            >
              Reset
            </Button>
          </Box>
        </form.Form>
      </Drawer>
    </form.AppForm>
  );
}

export function ItemsHeader({ count, page, disablePagination }: ItemsHeaderProps) {
  const { isLoading, startTransition } = useItemsPageContext();

  return (
    <ItemsHeaderLayout
      paginationProps={{
        count,
        page,
        disabled: disablePagination || isLoading,
        startTransition,
      }}
      searchField={
        <Suspense fallback={<h1>LOADING SEARCH</h1>}>
          <ItemSearchField />
        </Suspense>
      }
    />
  );
}
