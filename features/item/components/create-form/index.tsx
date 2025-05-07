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
  Paper,
  Typography,
} from "@mui/material";
import z from "zod";
import { type FileRejection, useDropzone } from "react-dropzone";
import { Upload } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface Fields {
  title: string;
  articleId?: string;
  files: {
    accepted: File[];
    rejected: FileRejection[];
  };
  quantity: number;
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
    } as Fields,
    onSubmit: async ({ value }) => {
      const { files, quantity, title, articleId } = value;
      const id = await createItem({ title, articleId, files: "", quantity }, files.accepted);
      form.resetField("files");
      successSnackbar();
      push(`/items/${id}`);
    },
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    maxSize: 10_000_000,
    maxFiles: 10,
    onDrop: (accepted, rejected) => form.setFieldValue("files", { accepted, rejected }),
  });

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      display="flex"
      flexDirection="column"
      gap={3}
    >
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
                              {file.name}
                            </Typography>
                          </Alert>
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
      </Box>
      <Box display="flex" gap={1.5}>
        <Button type="submit" variant="contained" loading={form.state.isSubmitting} size="large">
          Save
        </Button>
        <Button onClick={back}>Cancel</Button>
      </Box>
    </Box>
  );
}
