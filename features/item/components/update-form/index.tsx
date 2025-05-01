"use client";

import { enqueueSnackbar } from "notistack";
import { useAppForm, useDisclosure } from "@/hooks";
import { updateItem } from "./action";
import { Alert, Box, Button, FormControl, Modal, Typography } from "@mui/material";
import { ModalContent } from "@/components";
import z from "zod";
import { useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { useDropzone } from "react-dropzone";
import { Upload } from "@mui/icons-material";

interface Fields {
  title?: string;
  articleId?: string;
  files?: File[];
  quantity: number;
}

interface UpdateFormProps {
  id: number;
  currentTitle: string;
  imageId: string | undefined;
}

function successSnackbar() {
  enqueueSnackbar({
    variant: "success",
    message: "Updated item",
  });
}

export function UpdateItemForm({ id, currentTitle, imageId: files }: UpdateFormProps) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
    multiple: true,
    maxSize: 10_000_000,
    maxFiles: 10,
  });
  const [isOpen, { open, close }] = useDisclosure();
  const form = useAppForm({
    defaultValues: { title: currentTitle, files: [], quantity: 0, articleId: "" } as Fields,
    onSubmit: async ({ value }) => {
      const { image, title } = value;
      if (!image) {
        await updateItem(id, title?.trim());
        onClose();
        successSnackbar();
        return;
      }
      const imageBuffer = await image.arrayBuffer();
      await updateItem(id, title?.trim(), Buffer.from(imageBuffer).toString("base64"));
      onClose();
      successSnackbar();
    },
  });

  /**
   * Set the default selected image
   */
  const { data: currentFiles, isLoading: isCurrentFilesLoading } = useQuery({
    queryKey: ["files", files],
    queryFn: async () => {
      if (!files?.length) {
        return [];
      }
      return Promise.all(
        files.split(",").map(async (file) => {
          const res = await fetch(`/${file}`);
          const blob = await res.blob();
          return new File([blob], file);
        })
      );
    },
    onSuccess: (data) => {
      form.setFieldValue("files", data);
    },
  });

  useEffect(() => {
    form.setFieldValue("files", acceptedFiles as File[]);
  }, [acceptedFiles, form]);

  const onClose = useCallback(() => {
    close();
  }, [close]);

  return (
    <>
      <Button onClick={open}>Edit</Button>
      <Modal open={isOpen} onClose={onClose}>
        <ModalContent
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Typography variant="h5">Edit item</Typography>
          <Box display="flex" flexDirection="column" gap={1.5}>
            <form.AppField
              name="title"
              validators={{
                onChange: z
                  .string({ message: "Title must be a string." })
                  .min(1, "Title is required."),
              }}
            >
              {(field) => {
                const error = field.state.meta.errors.at(0);
                const hasError = Boolean(error);

                return (
                  <FormControl fullWidth error={hasError}>
                    <field.TextField
                      autoFocus
                      error={hasError}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      label="Title"
                      placeholder="IKEA"
                    />
                    {error && (
                      <Typography variant="body2" color="error" mt={0.5}>
                        {error.message}
                      </Typography>
                    )}
                  </FormControl>
                );
              }}
            </form.AppField>
            <form.AppField
              name="articleId"
              validators={{
                onChange: z.string({ message: "Title must be a string." }),
              }}
            >
              {(field) => {
                const error = field.state.meta.errors.at(0);
                const hasError = Boolean(error);

                return (
                  <FormControl fullWidth error={hasError}>
                    <field.TextField
                      error={hasError}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      label="Article id"
                      placeholder="dG8rm4nVC7dfj57"
                    />
                    {error && (
                      <Typography variant="body2" color="error" mt={0.5}>
                        {error.message}
                      </Typography>
                    )}
                  </FormControl>
                );
              }}
            </form.AppField>
            <form.AppField
              name="quantity"
              validators={{
                onChange: z
                  .number({ message: "Quantity must be a number." })
                  .min(0, "Quantity must be 0 or bigger."),
              }}
            >
              {(field) => {
                const error = field.state.meta.errors.at(0);
                const hasError = Boolean(error);

                return (
                  <FormControl fullWidth error={hasError}>
                    <field.TextField
                      error={hasError}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      onBlur={field.handleBlur}
                      label="Quantity"
                      placeholder="1"
                      slotProps={{ htmlInput: { min: 0 } }}
                      type="number"
                    />
                    {error && (
                      <Typography variant="body2" color="error" mt={0.5}>
                        {error.message}
                      </Typography>
                    )}
                  </FormControl>
                );
              }}
            </form.AppField>
            <form.AppField name="files">
              {() => (
                <FormControl sx={{ width: 400 }}>
                  <Box
                    {...getRootProps()}
                    borderRadius={1}
                    border="2px dashed"
                    borderColor={isDragActive ? "primary.main" : "grey.400"}
                    height={200}
                    display="flex"
                    sx={{ cursor: "pointer" }}
                  >
                    <Box m="auto" sx={{ pointerEvents: "none" }}>
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
                      <Box placeholder="Upload here" component="input" {...getInputProps()} />
                    </Box>
                  </Box>
                  <Typography color="textSecondary" variant="caption" mt={0.5}>
                    Max 10 files, up to 10MB per file.
                    <br />
                    Image and PDF only.
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={0.75}
                    height={200}
                    overflow="auto"
                    mt={1.5}
                  >
                    {acceptedFiles.map((acceptedFile, i) => (
                      <Alert
                        key={i}
                        variant="outlined"
                        severity="success"
                        sx={{ mr: "2px", py: 0, px: 1 }}
                      >
                        <Typography
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          variant="subtitle2"
                        >
                          {acceptedFile.name}
                        </Typography>
                      </Alert>
                    ))}
                    {fileRejections.map((fileRejection, i) => (
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
                          {fileRejection.file.name}
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={400}>
                          {fileRejection.errors.at(0)?.message}
                        </Typography>
                      </Alert>
                    ))}
                  </Box>
                </FormControl>
              )}
            </form.AppField>
          </Box>
          <Box display="flex" gap={1.5} justifyContent="end" width="100%">
            <Button onClick={onClose}>Cancel</Button>
            <form.SubmitButton loading={form.state.isSubmitting}>Submit</form.SubmitButton>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
