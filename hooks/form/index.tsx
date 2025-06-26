"use client";

import { createFormHook } from "@tanstack/react-form";
import { Form, SubmitButton, TagsField, Field, ArchivedToggler } from "./components";
import { fieldContext, formContext } from "./context";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Field,
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
