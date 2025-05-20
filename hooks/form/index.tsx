"use client";

import { createFormHook } from "@tanstack/react-form";
import { Checkbox, Form, SubmitButton, TagsField, TextField } from "./components";
import { fieldContext, formContext } from "./context";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    Checkbox,
    TagsField,
  },
  formComponents: {
    SubmitButton,
    Form,
  },
  fieldContext,
  formContext,
});
