"use client";

import { enqueueSnackbar } from "notistack";
import { useAppForm, useDisclosure } from "@/hooks";
import { updateItem } from "./action";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  FormControl,
  Modal,
  Typography,
} from "@mui/material";
import { ModalContent } from "@/components";
import z from "zod";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ExpandMore, Upload } from "@mui/icons-material";
import { FilesTransferList } from "./files-transfer-list";

interface Fields {
  title?: string;
  articleId?: string;
  files: File[];
  filesToRemove: string[];
  quantity: number;
}

interface UpdateFormProps {
  id: number;
  title: string;
  files: string;
  articleId: string | null;
  quantity: number | null;
}

function successSnackbar() {
  enqueueSnackbar({
    variant: "success",
    message: "Updated item",
  });
}

export function UpdateItemForm({ id, title, files, articleId, quantity }: UpdateFormProps) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
    multiple: true,
    maxSize: 10_000_000,
    maxFiles: 10,
  });
  const [isOpen, { open, close }] = useDisclosure();
  const form = useAppForm({
    defaultValues: {
      title,
      files: [],
      quantity: quantity ?? 1,
      articleId: articleId ?? "",
      filesToRemove: [],
    } as Fields,
    onSubmit: async ({ value }) => {
      const { filesToRemove, quantity, articleId, files, title } = value;
      await updateItem(
        id,
        {
          title: title?.trim(),
          quantity,
          articleId: articleId || null,
        },
        files,
        filesToRemove
      );
      onClose();
      successSnackbar();
    },
  });

  const parsedFiles = files.split(",").filter(Boolean);

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
          width={800}
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
          <Box display="flex" flexDirection="column" gap={3}>
            <Box display="flex" gap={3}>
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
            </Box>
            <Box display="flex" gap={3}>
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
              <Box width="100%" />
            </Box>
            <form.AppField name="files">
              {() => (
                <FormControl>
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
                  <Typography color="textSecondary" variant="caption" mt={0.75}>
                    Max 10 files, up to 10MB per file. Filenames must be unique.
                  </Typography>
                  <Accordion disabled={parsedFiles.length === 0} sx={{ mt: 1.5 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      Existing ({parsedFiles.length})
                    </AccordionSummary>
                    <AccordionDetails>
                      <FilesTransferList
                        initial={parsedFiles}
                        onChange={(value) => form.setFieldValue("filesToRemove", value)}
                      />
                    </AccordionDetails>
                  </Accordion>
                  <Accordion disabled={acceptedFiles.length === 0} sx={{ mt: 1.5 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      Accepted ({acceptedFiles.length})
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        maxHeight: 100,
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.75,
                      }}
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
                    </AccordionDetails>
                  </Accordion>
                  <Accordion disabled={fileRejections.length === 0} sx={{ mt: 1.5 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      Accepted ({fileRejections.length})
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        maxHeight: 100,
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.75,
                      }}
                    >
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
                    </AccordionDetails>
                  </Accordion>
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
