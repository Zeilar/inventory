"use client";

import {
  Button,
  Checkbox,
  type ButtonProps,
  type CheckboxProps,
  inputAdornmentClasses,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { MuiFileInput, type MuiFileInputProps } from "mui-file-input";

const { fieldContext, formContext } = createFormHookContexts();

const SubmitButton = (props: ButtonProps) => (
  <Button {...props} variant="contained" type="submit" />
);

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField: (props: TextFieldProps) => <TextField size="small" {...props} />,
    MuiFileInput: (props: MuiFileInputProps) => (
      <MuiFileInput
        sx={{
          // This had a margin-right even when there was no icon.
          [`.${inputAdornmentClasses.root}`]: {
            display: "none",
          },
        }}
        size="small"
        {...props}
      />
    ),
    CheckBox: (props: CheckboxProps) => <Checkbox {...props} />,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
