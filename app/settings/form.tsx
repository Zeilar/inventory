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
import { ColorModeSwitcher } from "@/components";
import { Flex, Text } from "@chakra-ui/react";

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
      <form.Form display="flex" flexDir="column" gap={4}>
        <form.AppField name="itemsPerPage">
          {(field) => (
            <field.Field
              onChange={(e) => field.handleChange(parseInt(e.target.value) || MIN_ITEMS_PER_PAGE)}
              type="number"
              label="Items per page"
              w={["100%", 200]}
              min={MIN_ITEMS_PER_PAGE}
              max={MAX_ITEMS_PER_PAGE}
              required
            />
          )}
        </form.AppField>
        <Flex flexDir="column" gap={1.5} display={["flex", "none"]}>
          <Text textStyle="label">Theme</Text>
          <ColorModeSwitcher />
        </Flex>
        <div>
          <form.SubmitButton w={["100%", "auto"]}>Save</form.SubmitButton>
        </div>
      </form.Form>
    </form.AppForm>
  );
}
