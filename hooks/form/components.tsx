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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useFieldContext, useFormContext } from "./context";
import { FormEvent } from "react";
import { MuiChipsInput, type MuiChipsInputProps } from "mui-chips-input";
import type { ZodIssueBase } from "zod";

export function TextField(props: TextFieldProps) {
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
}

export function Checkbox(props: CheckboxProps) {
  const { handleBlur, handleChange, state } = useFieldContext();

  return (
    <MuiCheckbox
      onBlur={handleBlur}
      onChange={(e) => handleChange(e.target.checked)}
      value={state.value}
      {...props}
    />
  );
}

export function SubmitButton(props: ButtonProps) {
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
}

export function Form(props: BoxProps) {
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
}

export function TagsField(props: MuiChipsInputProps) {
  const { state, handleBlur, handleChange } = useFieldContext<string>();
  const { meta, value } = state;
  const tags = value.split(",").filter(Boolean);
  const error = meta.errors.at(0);

  return (
    <MuiChipsInput
      autoComplete="off"
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
}

export function ArchivedToggler() {
  const { state, handleChange } = useFieldContext<boolean>();

  return (
    <ToggleButtonGroup
      value={state.value}
      exclusive
      onChange={(_e, value) => {
        if (value == null) {
          return;
        }
        handleChange(value);
      }}
    >
      <ToggleButton color="success" value={false}>
        Published
      </ToggleButton>
      <ToggleButton color="warning" value={true}>
        Archived
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
