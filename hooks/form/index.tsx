"use client";

import { createFormHook } from "@tanstack/react-form";
import { Checkbox, Form, SubmitButton, TagsField, TextField, ArchivedToggler } from "./components";
import { fieldContext, formContext } from "./context";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    Checkbox,
    TagsField,
    ArchivedToggler,
  },
  formComponents: {
    SubmitButton,
    Form,
  },
  fieldContext,
  formContext,
});
