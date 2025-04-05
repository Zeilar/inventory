"use client";

import { imageSize } from "image-size";
import u8 from "to-uint8";
import { enqueueSnackbar } from "notistack";
import { useAppForm, useDisclosure } from "@/hooks";
import { update } from "./action";
import { Button, Modal } from "@mui/material";
import { ModalContent } from "@/components";

interface Fields {
  title?: string;
  image?: File | null;
}

interface UpdateFormProps {
  id: number;
  currentTitle: string;
}

function successSnackbar() {
  enqueueSnackbar({
    variant: "success",
    message: "Updated receipt.",
  });
}

export function UpdateForm({ id, currentTitle }: UpdateFormProps) {
  const [isOpen, { open, close }] = useDisclosure();
  const form = useAppForm({
    defaultValues: { title: currentTitle, image: null } as Fields,
    onSubmit: async ({ value }) => {
      const { image, title } = value;
      if (!image) {
        await update(id, title?.trim());
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
      await update(id, title?.trim(), Buffer.from(imageBuffer).toString("base64"), width, height);
      form.resetField("image");
      close();
      successSnackbar();
    },
  });

  return (
    <>
      <Button variant="outlined" onClick={open}>
        Edit
      </Button>
      <Modal open={isOpen} onClose={close}>
        <ModalContent
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.AppField name="title">
            {(field) => (
              <field.TextField
                label="New title"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            )}
          </form.AppField>
          <form.AppField name="image">
            {(field) => (
              <field.MuiFileInput value={field.state.value} onChange={field.handleChange} />
            )}
          </form.AppField>
          <form.SubmitButton loading={form.state.isSubmitting}>Submit</form.SubmitButton>
        </ModalContent>
      </Modal>
    </>
  );
}
