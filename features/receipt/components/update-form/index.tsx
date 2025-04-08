"use client";

import { imageSize } from "image-size";
import u8 from "to-uint8";
import { enqueueSnackbar } from "notistack";
import { useAppForm, useDisclosure } from "@/hooks";
import { updateReceipt } from "./action";
import { Box, Button, FormControl, Modal, Typography } from "@mui/material";
import { ImagePlaceholder, ModalContent } from "@/components";
import z from "zod";
import { getImageSrc } from "@/common/image/path";
import { imageCardHeight } from "@/common/image";

interface Fields {
  title?: string;
  image?: File | null;
}

interface UpdateFormProps {
  id: number;
  currentTitle: string;
  imageId: string | undefined;
}

function successSnackbar() {
  enqueueSnackbar({
    variant: "success",
    message: "Updated receipt",
  });
}

function getImageFieldSrc(input: Fields["image"], imageId: string | undefined): string | null {
  if (input) {
    return URL.createObjectURL(input);
  }
  if (imageId) {
    return getImageSrc(imageId);
  }
  return null;
}

export function UpdateReceiptForm({ id, currentTitle, imageId }: UpdateFormProps) {
  const [isOpen, { open, close }] = useDisclosure();
  const form = useAppForm({
    defaultValues: { title: currentTitle, image: null } as Fields,
    onSubmit: async ({ value }) => {
      const { image, title } = value;
      if (!image) {
        await updateReceipt(id, title?.trim());
        form.resetField("image");
        close();
        successSnackbar();
        return;
      }
      const imageBuffer = await image.arrayBuffer();
      const imageData = u8(imageBuffer);
      if (!imageData) {
        enqueueSnackbar({
          variant: "error",
          message: "Invalid image file.",
        });
        return;
      }
      const { width, height } = imageSize(imageData);
      await updateReceipt(
        id,
        title?.trim(),
        Buffer.from(imageBuffer).toString("base64"),
        width,
        height
      );
      form.resetField("image");
      close();
      successSnackbar();
    },
  });

  const imageFieldValue = form.getFieldValue("image");

  return (
    <>
      <Button onClick={open}>Edit</Button>
      <Modal open={isOpen} onClose={close}>
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
                  console.log("no value");
                  return;
                }
                if (!value?.type.startsWith("image")) {
                  console.log("2");
                  return "File must be of an image format.";
                }
                if (value.size > 10_000_000) {
                  console.log("3");
                  return "Image size must exceed 10MB.";
                }
                return undefined;
              },
            }}
          >
            {(field) => {
              const error = field.state.meta.errors.at(0);
              const hasError = Boolean(error);
              const imageSrc = getImageFieldSrc(field.state.value, imageId);

              return (
                <FormControl fullWidth error={hasError}>
                  <field.MuiFileInput
                    label="Image"
                    error={hasError}
                    value={field.state.value}
                    onChange={field.handleChange}
                    placeholder="receipt.jpg"
                  />
                  {error && (
                    <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
                      {error}
                    </Typography>
                  )}
                  <Button sx={{ alignSelf: "start", mt: 1 }} onClick={() => field.setValue(null)}>
                    Clear
                  </Button>
                  <Box mt={1}>
                    {imageSrc ? (
                      <Box component="img" src={imageSrc} width="100%" alt="Preview" />
                    ) : (
                      <ImagePlaceholder height={150} />
                    )}
                  </Box>
                </FormControl>
              );
            }}
          </form.AppField>
          <form.SubmitButton sx={{ mt: 1 }} loading={form.state.isSubmitting}>
            Submit
          </form.SubmitButton>
        </ModalContent>
      </Modal>
    </>
  );
}
