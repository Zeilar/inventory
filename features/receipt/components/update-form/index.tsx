"use client";

import { enqueueSnackbar } from "notistack";
import { useAppForm, useDisclosure } from "@/hooks";
import { updateReceipt } from "./action";
import { Box, Button, FormControl, Modal, Skeleton, Typography } from "@mui/material";
import { ImagePlaceholder, ModalContent } from "@/components";
import z from "zod";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { getImageFilename } from "@/common/image/path";

interface Fields {
  title?: string;
  image?: File | null;
}

interface UpdateFormProps {
  id: number;
  currentTitle: string;
  imageId: string | undefined;
}

interface ImagePreviewProps {
  src: string | null;
  isLoading: boolean;
}

function successSnackbar() {
  enqueueSnackbar({
    variant: "success",
    message: "Updated receipt",
  });
}

const IMAGE_PREVIEW_HEIGHT = 150;

function ImagePreview({ isLoading, src }: ImagePreviewProps) {
  if (isLoading) {
    return <Skeleton height={IMAGE_PREVIEW_HEIGHT} sx={{ transform: "none" }} />;
  }
  if (src) {
    return <Box component="img" src={src} width="100%" alt="Preview" />;
  }
  return <ImagePlaceholder height={IMAGE_PREVIEW_HEIGHT} />;
}

export function UpdateReceiptForm({ id, currentTitle, imageId }: UpdateFormProps) {
  const [isOpen, { open, close }] = useDisclosure();
  const form = useAppForm({
    defaultValues: { title: currentTitle, image: null } as Fields,
    onSubmit: async ({ value }) => {
      const { image, title } = value;
      if (!image) {
        await updateReceipt(id, title?.trim());
        onClose();
        successSnackbar();
        return;
      }
      const imageBuffer = await image.arrayBuffer();
      await updateReceipt(id, title?.trim(), Buffer.from(imageBuffer).toString("base64"));
      onClose();
      successSnackbar();
    },
  });

  /**
   * Set the default selected image
   */
  const { data: currentImage, isLoading: isCurrentImageLoading } = useQuery({
    queryKey: ["image", imageId],
    queryFn: async () => {
      if (!imageId) {
        return null;
      }
      const imageFilename = getImageFilename(imageId);
      const res = await fetch(`/images/${imageFilename}`);
      const blob = await res.blob();
      return new File([blob], imageFilename);
    },
    onSuccess: (data) => {
      form.setFieldValue("image", data);
    },
  });

  const reset = useCallback(() => {
    // form.reset for whatever reason doesn't always work.
    form.setFieldValue("image", currentImage);
    form.setFieldValue("title", currentTitle);
  }, [form, currentTitle, currentImage]);

  const onClose = useCallback(() => {
    close();
    reset();
  }, [close, reset]);

  return (
    <>
      <Button onClick={open}>Edit</Button>
      <Modal open={isOpen} onClose={onClose} keepMounted>
        <ModalContent
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography variant="h5" mb={2}>
            Edit receipt
          </Typography>
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
                    <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
                      {error.message}
                    </Typography>
                  )}
                </FormControl>
              );
            }}
          </form.AppField>
          <form.AppField
            name="image"
            validators={{
              onChange: ({ value }) => {
                if (!value) {
                  return; // Field is optional
                }
                if (!value?.type.startsWith("image")) {
                  return "File must be of an image format.";
                }
                if (value.size > 10_000_000) {
                  return "Image size must exceed 10MB.";
                }
                return undefined;
              },
            }}
          >
            {(field) => {
              const error = field.state.meta.errors.at(0);
              const hasError = Boolean(error);
              const imageSrc = field.state.value ? URL.createObjectURL(field.state.value) : null;

              return (
                <FormControl fullWidth error={hasError}>
                  <Box display="flex" gap={1}>
                    <field.MuiFileInput
                      label="Image"
                      error={hasError}
                      value={field.state.value}
                      onChange={field.handleChange}
                      placeholder="receipt.jpg"
                      disabled={isCurrentImageLoading}
                    />
                    <Button onClick={() => field.setValue(null)}>Clear</Button>
                  </Box>
                  {error && (
                    <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
                      {error}
                    </Typography>
                  )}
                  <Box mt={1}>
                    <ImagePreview src={imageSrc} isLoading={isCurrentImageLoading} />
                  </Box>
                </FormControl>
              );
            }}
          </form.AppField>
          <Box display="flex" alignItems="center" justifyContent="bet" gap={1} mt={1}>
            <Button onClick={reset}>Reset</Button>
            <Box display="flex" gap={1} justifyContent="end" width="100%">
              <Button onClick={onClose}>Cancel</Button>
              <form.SubmitButton loading={form.state.isSubmitting}>Submit</form.SubmitButton>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
