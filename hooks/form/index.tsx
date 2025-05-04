"use client";

import {
  Button,
  Checkbox,
  type ButtonProps,
  type CheckboxProps,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

const { fieldContext, formContext } = createFormHookContexts();

const SubmitButton = (props: ButtonProps) => (
  <Button {...props} variant="contained" type="submit" />
);

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField: (props: TextFieldProps) => <TextField size="small" {...props} />,
    CheckBox: (props: CheckboxProps) => <Checkbox {...props} />,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
