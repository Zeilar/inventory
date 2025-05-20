"use client";

import { Pagination, UnstyledLink, type PaginationProps } from "@/components";
import { ItemSearchField } from "@/features/item/components";
import {
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Typography,
} from "@mui/material";
import { useItemsPageContext } from "../../context";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Add, FilterAlt } from "@mui/icons-material";
import { useAppForm, useDisclosure } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import type { ItemsFilterParams } from "@/app/api/items/route";
import { MuiChipsInput } from "mui-chips-input";
import { useShallowPush } from "@/features/item";

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
  published: `${true}`,
  archived: `${false}`,
  tags: "",
};

export function ItemsHeaderLayout({ paginationProps, searchField }: ItemsHeaderLayoutProps) {
  const { refresh } = useRouter();
  const searchParams = useSearchParams();
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
  const shallowPush = useShallowPush();

  return (
    <Box position="sticky" top={0} bgcolor="grey.800">
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
                    {(field) => (
                      <field.TextField type="number" slotProps={{ htmlInput: { min: 0 } }} />
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
                      onChange: ({ value }) => shallowPush("quantityTo", value),
                    }}
                  >
                    {(field) => (
                      <field.TextField type="number" slotProps={{ htmlInput: { min: 0 } }} />
                    )}
                  </form.AppField>
                </Box>
              </FormControl>
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
              <FormControl sx={{ bgcolor: "transparent" }}>
                <FormLabel sx={{ mb: 0.75 }}>Status</FormLabel>
                <Box display="flex" gap={1.5} alignItems="center">
                  <form.AppField
                    name="published"
                    listeners={{
                      onChange: ({ value }) => shallowPush("published", `${value}`),
                    }}
                  >
                    {(field) => (
                      <FormControlLabel
                        control={
                          <field.Checkbox
                            checked={field.state.value === "true"}
                            onChange={(_e, checked) => field.handleChange(JSON.stringify(checked))}
                          />
                        }
                        label="Published"
                      />
                    )}
                  </form.AppField>
                  <form.AppField
                    name="archived"
                    listeners={{
                      onChange: ({ value }) => shallowPush("archived", `${value}`),
                    }}
                  >
                    {(field) => (
                      <FormControlLabel
                        control={
                          <field.Checkbox
                            checked={field.state.value === "true"}
                            onChange={(_e, checked) => field.handleChange(JSON.stringify(checked))}
                          />
                        }
                        label="Archived"
                      />
                    )}
                  </form.AppField>
                </Box>
              </FormControl>
              <Box gridColumn="1 / -1">
                <form.AppField
                  name="tags"
                  listeners={{
                    onChange: ({ value }) => shallowPush("tags", value),
                  }}
                >
                  {(field) => {
                    const tags = field.state.value.split(",").filter(Boolean);

                    return (
                      <FormControl sx={{ bgcolor: "transparent" }} fullWidth>
                        <FormLabel sx={{ mb: 0.75 }}>Tags</FormLabel>
                        <MuiChipsInput
                          size="small"
                          validate={(value) => Boolean(value) && !tags.includes(value)}
                          value={tags}
                          onBlur={field.handleBlur}
                          onChange={(value) => field.handleChange(value.join(","))}
                          placeholder={undefined}
                        />
                      </FormControl>
                    );
                  }}
                </form.AppField>
              </Box>
            </Box>
            <Box display="flex" gap={1.5}>
              <form.SubmitButton size="medium" sx={{ width: "fit-content" }}>
                Apply
              </form.SubmitButton>
              <Button
                variant="outlined"
                type="button"
                onClick={() => {
                  Object.entries(defaultValues).forEach(([key, value]) => {
                    shallowPush(key as ItemsFilterParams, value);
                  });
                  form.reset(defaultValues, { keepDefaultValues: false });
                  form.handleSubmit();
                }}
              >
                Reset
              </Button>
            </Box>
          </form.Form>
        </form.AppForm>
        <Divider sx={{ mb: 3 }} />
      </Collapse>
    </Box>
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
