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
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { useItemsPageContext } from "../../context";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Add, Close, FilterAlt } from "@mui/icons-material";
import { useAppForm, useDisclosure } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import type { ItemsFilterParams, SortDirection } from "@/app/api/items/route";
import { useShallowPush } from "@/features/item";
import { Item } from "@/features/db/schema";
import { SIDEBAR_WIDTH } from "@/features/theme";

interface ItemsHeaderProps {
  page: number;
  count: number;
  disablePagination?: boolean;
}

interface ItemsHeaderLayoutProps {
  paginationProps: PaginationProps;
  searchField: ReactNode;
}

const defaultValues: Record<ItemsFilterParams, string> = {
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
      return direction === "asc" ? "Oldest first" : "Newest first";
    case "quantity":
      return `Quantity (${direction === "asc" ? "lowest first" : "highest first"})`;
    case "title":
      return `Title (${direction === "asc" ? "A-Z" : "Z-A"})`;
    case "updatedAt":
      return `Updated (${direction === "asc" ? "newest first" : "oldest first"})`;
    case "createdAt":
      return `Deposited (${direction === "asc" ? "newest first" : "oldest first"})`;
    case "archivedAt":
      return `Archived (${direction === "asc" ? "newest first" : "oldest first"})`;
    default:
      return `${capitalize(property)} ${direction === "asc" ? "min - max" : "max - min"}`;
  }
}

export function ItemsHeaderLayout({ paginationProps, searchField }: ItemsHeaderLayoutProps) {
  const { refresh } = useRouter();
  const searchParams = useSearchParams();
  const form = useAppForm({
    defaultValues: Object.fromEntries(
      Object.entries(defaultValues).map(([filter]) => [filter, searchParams.get(filter) ?? ""])
    ) as Record<ItemsFilterParams, string>,
    onSubmit: refresh,
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
  const [isFilterOpen, filter] = useDisclosure(Object.values(form.state.values).some(Boolean));
  const shallowPush = useShallowPush();

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
            {searchField}
            <Button
              color="secondary"
              variant="outlined"
              startIcon={!isFilterOpen ? <FilterAlt /> : <Close />}
              sx={{ height: 40 }}
              onClick={filter.toggle}
            >
              Filter
            </Button>
            <form.AppField name="sortBy" validators={{ onChangeListenTo: ["status"] }}>
              {(field) => (
                <FormControl size="small" sx={{ width: 250 }}>
                  <InputLabel>Sort</InputLabel>
                  <Select
                    value={`${field.state.value || "id"},${
                      form.getFieldValue("sortDirection") || "desc"
                    }`}
                    size="small"
                    label="Sort"
                    renderValue={(value) => {
                      const [sortBy, sortDirection] = value.split(",");
                      return renderSortLabel(sortBy as keyof Item, sortDirection as SortDirection);
                    }}
                    onChange={(e) => {
                      const { value } = e.target;
                      const [sortBy, sortDirection] = value.split(",");
                      shallowPush("sortBy", sortBy);
                      shallowPush("sortDirection", sortDirection);
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
                    <MenuItem value="createdAt,asc">{renderSortLabel("createdAt", "asc")}</MenuItem>
                    <MenuItem value="createdAt,desc">
                      {renderSortLabel("createdAt", "desc")}
                    </MenuItem>
                    <MenuItem
                      value="archivedAt,asc"
                      disabled={form.getFieldValue("status") === "published"}
                    >
                      {renderSortLabel("archivedAt", "asc")}
                    </MenuItem>
                    <MenuItem
                      value="archivedAt,desc"
                      disabled={form.getFieldValue("status") === "published"}
                    >
                      {renderSortLabel("archivedAt", "desc")}
                    </MenuItem>
                    <MenuItem value="updatedAt,asc">{renderSortLabel("updatedAt", "asc")}</MenuItem>
                    <MenuItem value="updatedAt,desc">
                      {renderSortLabel("updatedAt", "desc")}
                    </MenuItem>
                  </Select>
                </FormControl>
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
          <form.AppField
            name="status"
            listeners={{
              onChange: ({ value }) => shallowPush("status", value),
            }}
          >
            {(field) => (
              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup
                  row
                  value={field.state.value || "published"}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                >
                  <FormControlLabel value="published" control={<Radio />} label="Published" />
                  <FormControlLabel value="archived" control={<Radio />} label="Archived" />
                  <FormControlLabel value="all" control={<Radio />} label="All" />
                </RadioGroup>
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
                listeners={{
                  onChange: ({ value }) => shallowPush("quantityFrom", value),
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
                listeners={{
                  onChange: ({ value }) => shallowPush("quantityTo", value),
                }}
              >
                {(field) => <field.TextField type="number" slotProps={{ htmlInput: { min: 0 } }} />}
              </form.AppField>
            </Box>
          </FormControl>
          <Divider />
          <FormControl sx={{ bgcolor: "transparent" }}>
            <FormLabel sx={{ mb: 0.75 }}>Date</FormLabel>
            <Box display="flex" gap={1.5} alignItems="center">
              <form.AppField
                name="dateFrom"
                listeners={{
                  onChange: ({ value }) => shallowPush("dateFrom", value),
                }}
              >
                {(field) => (
                  <field.TextField type="date" slotProps={{ inputLabel: { shrink: true } }} />
                )}
              </form.AppField>
              <span>-</span>
              <form.AppField
                name="dateTo"
                listeners={{
                  onChange: ({ value }) => shallowPush("dateTo", value),
                }}
              >
                {(field) => (
                  <field.TextField type="date" slotProps={{ inputLabel: { shrink: true } }} />
                )}
              </form.AppField>
            </Box>
          </FormControl>
          <Divider />
          <Box width="100%">
            <form.AppField
              name="tags"
              listeners={{
                onChange: ({ value }) => shallowPush("tags", value),
              }}
            >
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
              color="secondary"
              type="button"
              onClick={() => {
                form.reset(defaultValues);
                window.history.replaceState(null, "", "/items");
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
      searchField={<ItemSearchField />}
    />
  );
}
