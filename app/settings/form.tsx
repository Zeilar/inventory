"use client";

import type { SettingsValues } from "@/features/db/schema";
import { useAppForm } from "@/hooks";
import { saveSettings } from "./action";
import { enqueueSnackbar } from "notistack";
import {
  MAX_ITEMS_PER_PAGE,
  MIN_ITEMS_PER_PAGE,
  settingsValuesValidator,
} from "@/features/settings";

interface FormProps {
  settings: SettingsValues;
}

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
    validators: { onChange: settingsValuesValidator },
  });

  return (
    <form.AppForm>
      <form.Form display="flex" flexDirection="column" gap={3}>
        <form.AppField name="itemsPerPage">
          {(field) => (
            <field.TextField
              onChange={(e) => field.handleChange(parseInt(e.target.value) || MIN_ITEMS_PER_PAGE)}
              type="number"
              label="Items per page"
              sx={{ width: ["100%", 200] }}
              slotProps={{ htmlInput: { min: MIN_ITEMS_PER_PAGE, max: MAX_ITEMS_PER_PAGE } }}
              required
            />
          )}
        </form.AppField>
        <div>
          <form.SubmitButton sx={{ width: ["100%", "auto"] }}>Save</form.SubmitButton>
        </div>
      </form.Form>
    </form.AppForm>
  );
}
