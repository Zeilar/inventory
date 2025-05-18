"use client";

import { createFormHook } from "@tanstack/react-form";
import { Checkbox, Form, SubmitButton, TextField } from "./components";
import { fieldContext, formContext } from "./context";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    Checkbox,
  },
  formComponents: {
    SubmitButton,
    Form,
  },
  fieldContext,
  formContext,
});
