"use client";

import { imageSize } from "image-size";
import u8 from "to-uint8";
import { enqueueSnackbar } from "notistack";
import { useAppForm } from "@/hooks";
import { create } from "./action";

interface Fields {
  title: string;
  image: File | null;
}

export function CreateForm() {
  const form = useAppForm({
    defaultValues: { title: "", image: null } as Fields,
    onSubmit: async ({ value }) => {
      const { image, title } = value;
      if (!image) {
        await create(title);
        form.reset();
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
      const { width, height } = imageSize(data);
      await create(title, Buffer.from(imageBuffer).toString("base64"), width, height);
      form.reset();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField name="title">
        {(field) => (
          <field.TextField
            label="Title"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        )}
      </form.AppField>
      <form.AppField name="image">
        {(field) => <field.MuiFileInput value={field.state.value} onChange={field.handleChange} />}
      </form.AppField>
      <form.SubmitButton loading={form.state.isSubmitting}>Submit</form.SubmitButton>
    </form>
  );
}
