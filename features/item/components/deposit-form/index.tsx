"use client";

import { useAppForm } from "@/hooks";
import { createItem } from "./action";
import z from "zod";
import { type FileRejection, useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { Button, Box, Text, Icon, Flex, IconButton, Alert } from "@chakra-ui/react";
import { Heading } from "@/components";
import { MdClear, MdUpload } from "react-icons/md";
import { useMutation } from "react-query";
import { ItemCardPreview } from "@/app/items/(components)";
import { useStore } from "@tanstack/react-form";

interface Fields {
  title: string;
  articleId: string;
  files: {
    accepted: File[];
    rejected: FileRejection[];
  };
  quantity: number;
  tags: string;
  archived: boolean;
  price: string | null;
  links: string;
  thumbnail: File | null;
}

export function DepositItemForm() {
  const { back, push } = useRouter();
  const form = useAppForm({
    defaultValues: {
      title: "",
      files: { accepted: [], rejected: [] },
      quantity: 1,
      articleId: "",
      tags: "",
      archived: false,
      price: "",
      links: "",
      thumbnail: null,
    } as Fields,
    onSubmit: async ({ value }) => {
      const { files, quantity, title, articleId, tags, links, price, thumbnail } = value;
      if (!thumbnail) {
        throw new Error("Missing thumbnail.");
      }
      const id = await createItem(
        {
          title,
          articleId,
          files: "",
          quantity,
          tags,
          links,
          price: price || null,
          thumbnail: thumbnail.name,
        },
        files.accepted,
        thumbnail
      );
      push(`/items/${id}`);
    },
  });
  const filesDropzone = useDropzone({
    multiple: true,
    maxSize: 10_000_000, // 10MB.
    maxFiles: 10,
    onDrop: (accepted, rejected) => form.setFieldValue("files", { accepted, rejected }),
  });

  const archived = useStore(form.store, (state) => state.values.archived);
  const quantity = useStore(form.store, (state) => state.values.quantity);
  const title = useStore(form.store, (state) => state.values.title);
  const price = useStore(form.store, (state) => state.values.price);

  const thumbnailPreviewMutation = useMutation({
    mutationFn: async (thumbnail: File | null) => {
      if (!thumbnail) {
        return null;
      }
      return URL.createObjectURL(thumbnail);
    },
  });

  return (
    <form.AppForm>
      <form.Form display="flex" flexDir="column" gap={8}>
        <Box display="flex" flexDir="column" gap={8}>
          <Box
            display="grid"
            gridTemplateColumns={[
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
            ]}
            gap={4}
          >
            <Flex flexDir="column" gap={1}>
              <Text textStyle="label">Preview</Text>
              <ItemCardPreview
                thumbnailSrc={thumbnailPreviewMutation.data ?? null}
                item={{ archived, price, quantity, title }}
              />
            </Flex>
          </Box>
          <form.AppField name="archived">{(field) => <field.ArchivedToggler />}</form.AppField>
          <form.AppField
            name="thumbnail"
            validators={{
              onChange: ({ value }) => {
                if (!value) {
                  return "Thumbnail is required.";
                }
              },
            }}
          >
            {(field) => <field.ThumbnailField onChange={thumbnailPreviewMutation.mutate} />}
          </form.AppField>
          <Box display="flex" gap={8} flexDir={["column", "row"]}>
            <form.AppField
              name="title"
              validators={{
                onChange: z
                  .string({ message: "Title must be a string." })
                  .min(1, "Title is required."),
              }}
            >
              {(field) => <field.Field required label="Title" placeholder="Ryzen 7800X3D" />}
            </form.AppField>
            <form.AppField
              name="quantity"
              validators={{
                onChange: z
                  .number({ message: "Quantity must be a number.", coerce: true })
                  .min(0, "Quantity must be 0 or bigger."),
              }}
            >
              {(field) => (
                <field.Field required label="Quantity" type="number" placeholder="1" min={0} />
              )}
            </form.AppField>
          </Box>
          <Box display="flex" gap={8} flexDir={["column", "row"]}>
            <form.AppField name="articleId">
              {(field) => <field.Field label="Article id" placeholder="dG8rm4nVC7dfj57" />}
            </form.AppField>
            <form.AppField name="price">
              {(field) => <field.Field label="Price" placeholder="50 SEK" />}
            </form.AppField>
          </Box>
          <form.AppField name="files">
            {(field) => {
              const { accepted, rejected } = field.state.value;

              return (
                <Flex gap={2} flexDir="column">
                  <Text textStyle="label">Files</Text>
                  <Flex
                    {...filesDropzone.getRootProps()}
                    rounded="md"
                    border="2px dashed"
                    borderColor={filesDropzone.isDragActive ? "bg.fg" : "border"}
                    h={200}
                    p={4}
                    cursor="pointer"
                  >
                    <Flex m="auto" flexDir="column" textAlign="center" pointerEvents="none">
                      <Heading
                        display="flex"
                        flexDir="column"
                        size="xl"
                        as="h6"
                        alignItems="center"
                        gap={1}
                      >
                        <Icon color="bg.fg">
                          <MdUpload />
                        </Icon>
                        <Text>Drop your files here</Text>
                      </Heading>
                      <Text mt={1}>Or click anywhere in the area</Text>
                      <Text mt={2} color="fg.muted" fontSize="sm">
                        Max 10 files, up to 10MB per file. Filenames must be unique.
                      </Text>
                      <input {...filesDropzone.getInputProps()} />
                    </Flex>
                  </Flex>
                  <Flex flexDir={["column", "row"]} gap={2}>
                    <Box w="full" border="1px solid {colors.border}" rounded="sm">
                      <Text p={3} color={accepted.length === 0 ? "fg.muted" : undefined}>
                        Accepted ({accepted.length})
                      </Text>
                      {accepted.length > 0 ? (
                        <Flex flexDir="column" gap={2} overflow="auto" maxH={250} p={2} pt={0}>
                          {accepted.map((file, i) => (
                            <Flex key={i} gap={2} align="center">
                              <Alert.Root variant="solid" w="full" status="success">
                                <Alert.Indicator />
                                <Alert.Content>
                                  <Alert.Title>
                                    <Text truncate>{file.name}</Text>
                                  </Alert.Title>
                                </Alert.Content>
                              </Alert.Root>
                              <IconButton
                                variant="ghost"
                                onClick={() =>
                                  field.setValue(({ accepted, rejected }) => ({
                                    accepted: accepted.filter((element) => element !== file),
                                    rejected,
                                  }))
                                }
                              >
                                <MdClear />
                              </IconButton>
                            </Flex>
                          ))}
                        </Flex>
                      ) : null}
                    </Box>
                    <Box w="full" border="1px solid {colors.border}" rounded="sm">
                      <Text p={3} color={rejected.length === 0 ? "fg.muted" : undefined}>
                        Rejected ({rejected.length})
                      </Text>
                      {rejected.length > 0 ? (
                        <Flex flexDir="column" gap={2} overflow="auto" maxH={250} p={2} pt={0}>
                          {rejected.map((rejection, i) => (
                            <Alert.Root key={i} variant="solid" status="error">
                              <Alert.Indicator />
                              <Alert.Content mr="2px">
                                <Text truncate>{rejection.file.name}</Text>
                                <Text>{rejection.errors.at(0)?.message}</Text>
                              </Alert.Content>
                            </Alert.Root>
                          ))}
                        </Flex>
                      ) : null}
                    </Box>
                  </Flex>
                </Flex>
              );
            }}
          </form.AppField>
          <Flex flexDir={["column", "row"]} gap={8}>
            <form.AppField name="tags">{(field) => <field.TagsField label="Tags" />}</form.AppField>
            <form.AppField
              name="links"
              validators={{
                onChange: ({ value }) => {
                  const links = value.split(",").filter(Boolean);
                  for (const link of links) {
                    if (!z.string().url().safeParse(link).success) {
                      return "One or more URLs are invalid.";
                    }
                  }
                },
              }}
            >
              {(field) => <field.TagsField label="Links" />}
            </form.AppField>
          </Flex>
        </Box>
        <Flex gap={4} flexDir={["column", "row"]}>
          <form.SubmitButton w={["100%", "auto"]}>Save</form.SubmitButton>
          <Button variant="outline" onClick={back} w={["100%", "auto"]}>
            Cancel
          </Button>
        </Flex>
      </form.Form>
    </form.AppForm>
  );
}
