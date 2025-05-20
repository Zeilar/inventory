"use client";

import {
  Box,
  type BoxProps,
  Button,
  type ButtonProps,
  CheckboxProps,
  Checkbox as MuiCheckbox,
  TextField as MuiTextField,
  type TextFieldProps,
} from "@mui/material";
import { useFieldContext, useFormContext } from "./context";
import { FormEvent } from "react";
import { MuiChipsInput, type MuiChipsInputProps } from "mui-chips-input";
import type { ZodIssueBase } from "zod";

export const TextField = (props: TextFieldProps) => {
  const { handleBlur, handleChange, state } = useFieldContext();
  const error: ZodIssueBase | string | undefined = state.meta.errors.at(0);

  return (
    <MuiTextField
      onBlur={handleBlur}
      size="small"
      onChange={(e) => handleChange(e.target.value)}
      value={state.value}
      error={Boolean(error)}
      helperText={typeof error === "string" ? error : error?.message}
      fullWidth
      {...props}
    />
  );
};

export const Checkbox = (props: CheckboxProps) => {
  const { handleBlur, handleChange, state } = useFieldContext();

  return (
    <MuiCheckbox
      onBlur={handleBlur}
      onChange={(e) => handleChange(e.target.checked)}
      value={state.value}
      {...props}
    />
  );
};

export const SubmitButton = (props: ButtonProps) => {
  const { state } = useFormContext();

  return (
    <Button
      variant="contained"
      type="submit"
      size="large"
      loading={state.isSubmitting}
      {...props}
    />
  );
};

export const Form = (props: BoxProps) => {
  const { handleSubmit } = useFormContext();

  return (
    <Box
      component="form"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
      {...props}
    />
  );
};

export const TagsField = (props: MuiChipsInputProps) => {
  const { state, handleBlur, handleChange } = useFieldContext<string>();
  const { meta, value } = state;
  const tags = value.split(",").filter(Boolean);
  const error = meta.errors.at(0);

  return (
    <MuiChipsInput
      error={Boolean(error)}
      size="small"
      validate={(value) => Boolean(value) && !tags.includes(value)}
      value={tags}
      onBlur={handleBlur}
      onChange={(value) => handleChange(value.join(","))}
      placeholder={undefined}
      helperText={error}
      {...props}
    />
  );
};
