"use client";

import { useAppForm } from "@/hooks";
import { createItem } from "./action";
import z from "zod";
import { type FileRejection, useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { Button, Box, Text, Icon, Flex, IconButton, Alert } from "@chakra-ui/react";
import { Heading } from "@/components";
import { MdClear, MdUpload } from "react-icons/md";

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
}

export function CreateItemForm() {
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
    } as Fields,
    onSubmit: async ({ value }) => {
      const { files, quantity, title, articleId, tags, links, price } = value;
      const id = await createItem(
        {
          title,
          articleId,
          files: "",
          quantity,
          tags,
          links,
          price: price || null,
        },
        files.accepted
      );
      form.resetField("files");
      push(`/items/${id}`);
    },
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    maxSize: 10_000_000, // 10MB.
    maxFiles: 10,
    onDrop: (accepted, rejected) => form.setFieldValue("files", { accepted, rejected }),
  });

  return (
    <form.AppForm>
      <form.Form display="flex" flexDir="column" gap={4}>
        <Box display="flex" flexDir="column" gap={4}>
          <form.AppField name="archived">{(field) => <field.ArchivedToggler />}</form.AppField>
          <Box display="flex" gap={4} flexDir={["column", "row"]}>
            <form.AppField
              name="title"
              validators={{
                onChange: z
                  .string({ message: "Title must be a string." })
                  .min(1, "Title is required."),
              }}
            >
              {(field) => <field.Field label="Title" placeholder="IKEA" />}
            </form.AppField>
            <form.AppField
              name="quantity"
              validators={{
                onChange: z
                  .number({ message: "Quantity must be a number." })
                  .min(0, "Quantity must be 0 or bigger."),
              }}
            >
              {(field) => <field.Field label="Quantity" placeholder="1" min={0} />}
            </form.AppField>
          </Box>
          <Box display="flex" gap={4} flexDir={["column", "row"]}>
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
                    {...getRootProps()}
                    borderRadius="md"
                    border="2px dashed"
                    borderColor={isDragActive ? "teal.fg" : "border"}
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
                        <Icon color="teal.fg">
                          <MdUpload />
                        </Icon>
                        <Text>Drop your files here</Text>
                      </Heading>
                      <Text mt={1}>Or click anywhere in the area</Text>
                      <Text mt={2} color="fg.muted" fontSize="sm">
                        Max 10 files, up to 10MB per file. Filenames must be unique.
                      </Text>
                      <input {...getInputProps()} />
                    </Flex>
                  </Flex>
                  <Box border="1px solid {colors.border}" rounded="sm">
                    <Text p={3} color={accepted.length === 0 ? "fg.muted" : undefined}>
                      Accepted ({accepted.length})
                    </Text>
                    {accepted.length > 0 ? (
                      <Flex flexDir="column" gap={2} overflow="auto" maxH={250} p={2} pt={0}>
                        {accepted.map((file, i) => (
                          <Flex key={i} gap={2} align="center">
                            <Alert.Root variant="surface" w="full" status="success">
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
                  <Box border="1px solid {colors.border}" rounded="sm">
                    <Text p={3} color={rejected.length === 0 ? "fg.muted" : undefined}>
                      Rejected ({rejected.length})
                    </Text>
                    {rejected.length > 0 ? (
                      <Flex flexDir="column" gap={2} overflow="auto" maxH={250} p={2} pt={0}>
                        {rejected.map((rejection, i) => (
                          <Alert.Root key={i} variant="surface" status="error">
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
              );
            }}
          </form.AppField>
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
        </Box>
        <Flex gap={2}>
          <form.SubmitButton w={["100%", "auto"]}>Save</form.SubmitButton>
          <Button variant="outline" onClick={back} w={["100%", "auto"]}>
            Cancel
          </Button>
        </Flex>
      </form.Form>
    </form.AppForm>
  );
}
