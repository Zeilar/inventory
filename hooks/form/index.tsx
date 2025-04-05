"use client";

import { Button, type ButtonProps, TextField } from "@mui/material";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { MuiFileInput } from "mui-file-input";

const { fieldContext, formContext } = createFormHookContexts();

const SubmitButton = (props: ButtonProps) => (
  <Button {...props} variant="contained" type="submit" />
);

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    MuiFileInput,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
