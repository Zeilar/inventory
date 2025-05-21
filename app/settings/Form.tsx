"use client";

import { SettingsValues } from "@/features/db/schema";
import { useAppForm } from "@/hooks";
import { saveSettings } from "./action";
import { enqueueSnackbar } from "notistack";

interface FormProps {
  settings: SettingsValues;
}

const MIN_ITEMS_PER_PAGE = 1;
const MAX_ITEMS_PER_PAGE = 20;

export function Form({ settings }: FormProps) {
  const form = useAppForm({
    defaultValues: settings,
    onSubmit: async ({ value }) => {
      await saveSettings(value);
      enqueueSnackbar({
        variant: "success",
        message: "Saved settings",
      });
    },
  });

  return (
    <form.AppForm>
      <form.Form display="flex" flexDirection="column" gap={3}>
        <form.AppField
          name="itemsPerPage"
          validators={{
            onChange: ({ value }) => {
              if (value == null) {
                return "Field is required.";
              }
              if (value < MIN_ITEMS_PER_PAGE) {
                return `Must be higher than ${MIN_ITEMS_PER_PAGE}.`;
              }
              if (value > MAX_ITEMS_PER_PAGE) {
                return `Must be lower than ${MAX_ITEMS_PER_PAGE}.`;
              }
            },
          }}
        >
          {(field) => (
            <field.TextField
              onChange={(e) => field.handleChange(parseInt(e.target.value) || MIN_ITEMS_PER_PAGE)}
              type="number"
              label="Items per page"
              sx={{ width: 200 }}
              slotProps={{ htmlInput: { min: MIN_ITEMS_PER_PAGE, max: MAX_ITEMS_PER_PAGE } }}
              required
            />
          )}
        </form.AppField>
        <div>
          <form.SubmitButton>Save</form.SubmitButton>
        </div>
      </form.Form>
    </form.AppForm>
  );
}
