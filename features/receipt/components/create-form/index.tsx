"use client";

import u8 from "to-uint8";
import { enqueueSnackbar } from "notistack";
import { useAppForm, useDisclosure } from "@/hooks";
import { createReceipt } from "./action";
import { Button, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { ModalContent } from "@/components";

interface Fields {
  title: string;
  image: File | null;
}

function successSnackbar() {
  enqueueSnackbar({
    variant: "success",
    message: "Created receipt",
  });
}

export function CreateReceiptForm() {
  const [isOpen, { open, close }] = useDisclosure();
  const form = useAppForm({
    defaultValues: { title: "", image: null } as Fields,
    onSubmit: async ({ value }) => {
      const { image, title } = value;
      if (!image) {
        await createReceipt(title);
        form.reset();
        close();
        successSnackbar();
        return;
      }
      const imageBuffer = await image.arrayBuffer();
      const data = u8(imageBuffer);
      if (!data) {
        enqueueSnackbar({
          variant: "error",
          message: "Invalid image file.",
        });
        return;
      }
      await createReceipt(title, Buffer.from(imageBuffer).toString("base64"));
      form.reset();
      close();
      successSnackbar();
    },
  });

  return (
    <>
      <Button
        variant="contained"
        color="success"
        startIcon={<Add />}
        loading={form.state.isSubmitting}
        onClick={open}
        sx={{ height: "100%" }}
      >
        Add
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
                autoFocus
                label="Title"
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
