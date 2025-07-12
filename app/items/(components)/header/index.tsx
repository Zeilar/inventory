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
  CloseButton,
  createListCollection,
  Field,
  Flex,
  Portal,
  SegmentGroup,
  Select,
  Separator,
  Text,
} from "@chakra-ui/react";
import { MdAdd, MdClose, MdFilterAlt } from "react-icons/md";

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
      <div>
        <Flex justify="space-between" gap={4} mb={4}>
          <Heading size={["2xl", "2xl", "3xl"]} as="h1">
            Items
          </Heading>
          <UnstyledLink href="/items/deposit">
            <Button colorPalette="bg" variant="solid" size={["sm", "sm", "md"]}>
              <MdAdd />
              Deposit
            </Button>
          </UnstyledLink>
        </Flex>
        <Flex flexDir="column" gap={2}>
          <Flex
            flexDir={["column", "column", "row"]}
            align={["start", "start", "center"]}
            justify="space-between"
            gap={2}
          >
            <Box mr={[0, 0, "auto"]}>
              <Pagination {...paginationProps} />
            </Box>
            <Flex
              align={["start", "start", "center"]}
              flexDir={["column", "row", "row"]}
              justify="end"
              w={["full", "full", "auto"]}
              h={["auto", "auto", "40px"]}
              gap={2}
            >
              <Flex
                display={["flex", "flex", "contents"]}
                flexDir={["row", "row", "row-reverse"]}
                justify={["space-between", "space-between", "start"]}
                gap={2}
                w="full"
              >
                <Button onClick={filter.toggle} variant="outline" borderColor="border">
                  {!isFilterOpen ? <MdFilterAlt /> : <MdClose />}
                  <Text display={["none", "inline"]}>Filter</Text>
                </Button>
                {searchField}
              </Flex>
              <form.AppField name="sortBy" validators={{ onChangeListenTo: ["status"] }}>
                {(field) => {
                  return (
                    <Select.Root
                      colorPalette="bg"
                      collection={sortCollection}
                      w={["full", 250]}
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
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  );
                }}
              </form.AppField>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <Box
        as="nav"
        pos="fixed"
        top={0}
        left={isFilterOpen ? 0 : "-100%"}
        w={350}
        h="full"
        p={8}
        shadow="xl"
        zIndex="overlay"
        bgColor="bg.panel"
        transition="position"
      >
        <form.Form display="flex" flexDir="column" gap={8}>
          <Flex justify="space-between" align="center" gap={4}>
            <Heading as="h2" size="2xl">
              Filters
            </Heading>
            <CloseButton onClick={filter.close} />
          </Flex>
          <Separator />
          <form.AppField name="status">
            {(field) => (
              <div>
                <Field.Root mb={2}>
                  <Field.Label>Status</Field.Label>
                </Field.Root>
                <SegmentGroup.Root value={field.state.value} w="full" shadow="none">
                  <SegmentGroup.Item
                    roundedRight="none"
                    roundedLeft="sm"
                    w="full"
                    cursor="pointer"
                    onClick={() => field.handleChange("published")}
                    value="published"
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
                    _checked={{
                      color: "bg.fg",
                      bgColor: "bg.subtle",
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
          <Flex gap={2} flexDir="column" align="center">
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
          </Flex>
          <Separator />
          <form.AppField name="tags">{(field) => <field.TagsField label="Tags" />}</form.AppField>
          <Separator />
          <form.AppField name="links">{(field) => <field.TagsField label="Links" />}</form.AppField>
          <Separator />
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <form.SubmitButton>Apply</form.SubmitButton>
            <Button
              variant="outline"
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
