"use client";

import { createFormHook } from "@tanstack/react-form";
import {
  Form,
  SubmitButton,
  TagsField,
  Field,
  ArchivedToggler,
  ThumbnailField,
} from "./components";
import { fieldContext, formContext } from "./context";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Field,
    TagsField,
    ArchivedToggler,
    ThumbnailField,
  },
  formComponents: {
    SubmitButton,
    Form,
  },
  fieldContext,
  formContext,
});
