"use client";

import { Heading, Pagination, UnstyledLink, type PaginationProps } from "@/components";
import { ItemSearchField } from "@/features/item/components";
import { Suspense, type ReactNode } from "react";
import { useAppForm, useDisclosure } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import type { ItemsFilterParams, SortDirection } from "@/app/api/items/route";
import { Item } from "@/features/db/schema";
import isEqual from "lodash/isEqual";
import capitalize from "lodash/capitalize";
import {
  Box,
  Button,
  createListCollection,
  Field,
  Flex,
  IconButton,
  Portal,
  SegmentGroup,
  Select,
  Separator,
} from "@chakra-ui/react";
import { MdAdd, MdClose, MdFilterAlt } from "react-icons/md";
import { SIDEBAR_WIDTH } from "@/features/theme/constants";

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
  links: "",
  price: "",
};

function renderSortLabel(property: keyof Item, direction: SortDirection): string {
  switch (property) {
    case "id":
      return direction === "asc" ? "Oldest" : "Newest";
    case "quantity":
      return `Quantity (${direction === "asc" ? "lowest" : "highest"})`;
    case "title":
      return `Title (${direction === "asc" ? "A-Z" : "Z-A"})`;
    case "price":
      return `Price (${direction === "asc" ? "lowest" : "highest"})`;
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

const sortCollection = createListCollection({
  items: [
    { value: "id,desc", label: renderSortLabel("id", "desc") },
    { value: "id,asc", label: renderSortLabel("id", "asc") },
    { value: "quantity,asc", label: renderSortLabel("quantity", "asc") },
    { value: "quantity,desc", label: renderSortLabel("quantity", "desc") },
    { value: "title,asc", label: renderSortLabel("title", "asc") },
    { value: "title,desc", label: renderSortLabel("title", "desc") },
    { value: "price,desc", label: renderSortLabel("price", "desc") },
    { value: "price,asc", label: renderSortLabel("price", "asc") },
    { value: "createdAt,desc", label: renderSortLabel("createdAt", "desc") },
    { value: "createdAt,asc", label: renderSortLabel("createdAt", "asc") },
    { value: "archivedAt,desc", label: renderSortLabel("archivedAt", "desc") },
    { value: "archivedAt,asc", label: renderSortLabel("archivedAt", "asc") },
    { value: "updatedAt,desc", label: renderSortLabel("updatedAt", "desc") },
    { value: "updatedAt,asc", label: renderSortLabel("updatedAt", "asc") },
  ] satisfies Array<{ value: string; label: string }>,
});

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
        if (param) {
          newSearchParams.set(property, param);
        } else {
          newSearchParams.delete(property);
        }
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
      <Box>
        <Flex justifyContent="space-between" gap={4} mb={4}>
          <Heading size="3xl" as="h1">
            Items
          </Heading>
          <UnstyledLink href="/items/create">
            <Button colorPalette="teal" variant="surface">
              <MdAdd />
              Create
            </Button>
          </UnstyledLink>
        </Flex>
        <Box display="flex" flexDir="column" gap={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={["start", "center"]}
            gap={2}
            flexDir={["column", "row"]}
          >
            <Box mr="auto">
              <Pagination {...paginationProps} />
            </Box>
            <Box
              display="flex"
              alignItems={["start", "center"]}
              justifyContent="end"
              flexDir={["column", "row"]}
              width={["100%", "auto"]}
              h="40px"
              gap={2}
            >
              <Button onClick={filter.toggle} variant="surface">
                {!isFilterOpen ? <MdFilterAlt /> : <MdClose />}
                Filter
              </Button>
              {searchField}
              <form.AppField name="sortBy" validators={{ onChangeListenTo: ["status"] }}>
                {(field) => {
                  return (
                    <Select.Root
                      colorPalette="teal"
                      collection={sortCollection}
                      width={320}
                      value={[
                        `${field.state.value || "id"},${
                          form.getFieldValue("sortDirection") || "desc"
                        }`,
                      ]}
                      onValueChange={({ value }) => {
                        const [sortBy, sortDirection] = value[0].split(",");
                        field.handleChange(sortBy);
                        form.setFieldValue("sortDirection", sortDirection);
                        form.handleSubmit();
                      }}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Select sort" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {sortCollection.items.map((item) => (
                              <Select.Item item={item} key={item.value}>
                                {item.label}
                                <Select.ItemIndicator color="teal.fg" />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  );
                }}
              </form.AppField>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        as="nav"
        pos="fixed"
        top={0}
        left={isFilterOpen ? 0 : -SIDEBAR_WIDTH}
        w={SIDEBAR_WIDTH}
        h="100%"
        p={4}
        shadow="lg"
        zIndex="overlay"
        bgColor="bg.panel"
        transition="position"
      >
        <form.Form display="flex" flexDir="column" gap={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center" gap={4}>
            <Heading as="h2" size="2xl">
              Filters
            </Heading>
            <IconButton variant="ghost" onClick={filter.close}>
              <MdClose />
            </IconButton>
          </Box>
          <Separator />
          <form.AppField name="status">
            {(field) => (
              <div>
                <Field.Root mb={2}>
                  <Field.Label>Status</Field.Label>
                </Field.Root>
                <SegmentGroup.Root value={field.state.value} w="100%">
                  <SegmentGroup.Item
                    roundedRight="none"
                    roundedLeft="sm"
                    w="100%"
                    cursor="pointer"
                    onClick={() => field.handleChange("published")}
                    value="published"
                    border="1px solid {colors.border}"
                    mr="-1px"
                    _checked={{
                      color: "green.fg",
                      bgColor: "green.subtle",
                    }}
                    css={{ "&::before": { display: "none" } }}
                  >
                    Published
                  </SegmentGroup.Item>
                  <SegmentGroup.Item
                    rounded="none"
                    w="100%"
                    cursor="pointer"
                    onClick={() => field.handleChange("archived")}
                    value="archived"
                    border="1px solid"
                    borderColor="border"
                    mr="-1px"
                    _checked={{
                      color: "orange.fg",
                      bgColor: "orange.subtle",
                    }}
                    css={{ "&::before": { display: "none" } }}
                  >
                    Archived
                  </SegmentGroup.Item>
                  <SegmentGroup.Item
                    roundedRight="sm"
                    roundedLeft="none"
                    w="100%"
                    cursor="pointer"
                    onClick={() => field.handleChange("all")}
                    value="all"
                    border="1px solid"
                    borderColor="border"
                    _checked={{
                      color: "teal.fg",
                      bgColor: "teal.subtle",
                    }}
                    css={{ "&::before": { content: "none" } }}
                  >
                    All
                  </SegmentGroup.Item>
                </SegmentGroup.Root>
              </div>
            )}
          </form.AppField>
          <Separator />
          <div>
            <Field.Root mb={2}>
              <Field.Label>Quantity</Field.Label>
            </Field.Root>
            <Box display="flex" gap={2} alignItems="center">
              <form.AppField
                name="quantityFrom"
                validators={{
                  onChange: ({ value }) =>
                    parseInt(value) < 0 ? "Must not be a negative number." : undefined,
                }}
              >
                {(field) => <field.Field type="number" min={0} />}
              </form.AppField>
              <span>-</span>
              <form.AppField
                name="quantityTo"
                validators={{
                  onChange: ({ value }) =>
                    parseInt(value) < 0 ? "Must not be a negative number." : undefined,
                }}
              >
                {(field) => <field.Field type="number" min={0} />}
              </form.AppField>
            </Box>
          </div>
          <Separator />
          <Box display="flex" gap={2} flexDir="column" alignItems="center">
            <Field.Root>
              <Field.Label>Deposited at</Field.Label>
            </Field.Root>
            <form.AppField name="dateFrom">
              {(field) => <field.Field type="datetime-local" />}
            </form.AppField>
            <span>to</span>
            <form.AppField name="dateTo">
              {(field) => <field.Field type="datetime-local" />}
            </form.AppField>
          </Box>
          <Separator />
          <form.AppField name="tags">{(field) => <field.TagsField label="Tags" />}</form.AppField>
          <Separator />
          <form.AppField name="links">{(field) => <field.TagsField label="Links" />}</form.AppField>
          <Separator />
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <form.SubmitButton>Apply</form.SubmitButton>
            <Button
              variant="surface"
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
      </Box>
    </form.AppForm>
  );
}

export function ItemsHeader({ count, page, disablePagination }: ItemsHeaderProps) {
  return (
    <ItemsHeaderLayout
      paginationProps={{
        count,
        page,
        disabled: disablePagination,
      }}
      searchField={
        <Suspense fallback={<h1>LOADING SEARCH</h1>}>
          <ItemSearchField />
        </Suspense>
      }
    />
  );
}
