"use client";

import { enqueueSnackbar } from "notistack";
import { useAppForm } from "@/hooks";
import { createItem } from "./action";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import z from "zod";
import { type FileRejection, useDropzone } from "react-dropzone";
import { Clear, Upload } from "@mui/icons-material";
import { useRouter } from "next/navigation";

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
  originalPrice: string | null;
  links: string;
}

function successSnackbar() {
  enqueueSnackbar({
    variant: "success",
    message: "Created item",
  });
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
      originalPrice: "",
      links: "",
    } as Fields,
    onSubmit: async ({ value }) => {
      const { files, quantity, title, articleId, tags, links, originalPrice } = value;
      const id = await createItem(
        {
          title,
          articleId,
          files: "",
          quantity,
          tags,
          links,
          originalPrice: originalPrice || null,
        },
        files.accepted
      );
      form.resetField("files");
      successSnackbar();
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
      <form.Form display="flex" flexDirection="column" gap={3}>
        <Box display="flex" flexDirection="column" gap={3}>
          <form.AppField name="archived">{(field) => <field.ArchivedToggler />}</form.AppField>
          <Box display="flex" gap={3}>
            <form.AppField
              name="title"
              validators={{
                onChange: z
                  .string({ message: "Title must be a string." })
                  .min(1, "Title is required."),
              }}
            >
              {(field) => <field.TextField label="Title" placeholder="IKEA" />}
            </form.AppField>
            <form.AppField
              name="quantity"
              validators={{
                onChange: z
                  .number({ message: "Quantity must be a number." })
                  .min(0, "Quantity must be 0 or bigger."),
              }}
            >
              {(field) => (
                <field.TextField
                  label="Quantity"
                  placeholder="1"
                  slotProps={{ htmlInput: { min: 0 } }}
                />
              )}
            </form.AppField>
          </Box>
          <Box display="flex" gap={3}>
            <form.AppField name="articleId">
              {(field) => <field.TextField label="Article id" placeholder="dG8rm4nVC7dfj57" />}
            </form.AppField>
            <form.AppField name="originalPrice">
              {(field) => <field.TextField label="Original price" placeholder="50 SEK" />}
            </form.AppField>
          </Box>
          <form.AppField name="files">
            {(field) => {
              const { accepted, rejected } = field.state.value;

              return (
                <FormControl sx={{ gap: 1.5 }}>
                  <FormLabel>Files</FormLabel>
                  <Box
                    {...getRootProps()}
                    borderRadius={1}
                    border="2px dashed"
                    borderColor={isDragActive ? "primary.main" : "grey.400"}
                    height={200}
                    display="flex"
                    sx={{ cursor: "pointer" }}
                  >
                    <Box
                      m="auto"
                      display="flex"
                      flexDirection="column"
                      textAlign="center"
                      sx={{ pointerEvents: "none" }}
                    >
                      <Typography
                        display="flex"
                        flexDirection="column"
                        variant="h6"
                        alignItems="center"
                        gap={0.25}
                      >
                        <Upload color="primary" />
                        Drop your files here
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={400}>
                        Or click anywhere in the area
                      </Typography>
                      <Typography color="textSecondary" variant="caption" mt={1.5}>
                        Max 10 files, up to 10MB per file. Filenames must be unique.
                      </Typography>
                      <input {...getInputProps()} />
                    </Box>
                  </Box>
                  <Paper>
                    <Typography
                      variant="subtitle2"
                      p={1.5}
                      color={accepted.length === 0 ? "textDisabled" : undefined}
                    >
                      Accepted ({accepted.length})
                    </Typography>
                    {accepted.length > 0 ? (
                      <>
                        <Divider />
                        <Box
                          display="flex"
                          flexDirection="column"
                          gap={1.5}
                          overflow="auto"
                          maxHeight={250}
                          p={1.5}
                        >
                          {accepted.map((file, i) => (
                            <Box key={i} display="flex" gap={1.5}>
                              <Alert
                                variant="outlined"
                                severity="success"
                                sx={{ py: 0, px: 1, width: "100%" }}
                              >
                                <Typography
                                  whiteSpace="nowrap"
                                  overflow="hidden"
                                  textOverflow="ellipsis"
                                  variant="subtitle2"
                                >
                                  {file.name}
                                </Typography>
                              </Alert>
                              <IconButton
                                onClick={() =>
                                  field.setValue(({ accepted, rejected }) => ({
                                    accepted: accepted.filter((element) => element !== file),
                                    rejected,
                                  }))
                                }
                              >
                                <Clear />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      </>
                    ) : null}
                  </Paper>
                  <Paper>
                    <Typography
                      variant="subtitle2"
                      p={1.5}
                      color={rejected.length === 0 ? "textDisabled" : undefined}
                    >
                      Rejected ({rejected.length})
                    </Typography>
                    {rejected.length > 0 ? (
                      <>
                        <Divider />
                        <Box
                          display="flex"
                          flexDirection="column"
                          gap={1.5}
                          overflow="auto"
                          maxHeight={250}
                          p={1.5}
                        >
                          {rejected.map((rejection, i) => (
                            <Alert
                              key={i}
                              variant="outlined"
                              severity="error"
                              sx={{ mr: "2px", py: 0, px: 1 }}
                            >
                              <Typography
                                whiteSpace="nowrap"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                variant="subtitle2"
                              >
                                {rejection.file.name}
                              </Typography>
                              <Typography variant="subtitle2" fontWeight={400}>
                                {rejection.errors.at(0)?.message}
                              </Typography>
                            </Alert>
                          ))}
                        </Box>
                      </>
                    ) : null}
                  </Paper>
                </FormControl>
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
        <Box display="flex" gap={1.5}>
          <form.SubmitButton>Save</form.SubmitButton>
          <Button variant="outlined" onClick={back}>
            Cancel
          </Button>
        </Box>
      </form.Form>
    </form.AppForm>
  );
}
