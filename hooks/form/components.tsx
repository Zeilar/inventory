"use client";

import { useFieldContext, useFormContext } from "./context";
import type { ZodIssueBase } from "zod";
import {
  Box,
  type BoxProps,
  Button,
  type ButtonProps,
  Field as ChakraField,
  Input,
  type InputProps,
  SegmentGroup,
  Tag,
} from "@chakra-ui/react";
import { useState, type ReactNode } from "react";

interface TagsFieldProps {
  label?: ReactNode;
}

export function Field({ label, children, required, ...props }: InputProps & { label?: ReactNode }) {
  const { handleBlur, handleChange, state } = useFieldContext<string | number>();
  const error: ZodIssueBase | string | undefined = state.meta.errors.at(0);
  const hasError = Boolean(error);

  return (
    <ChakraField.Root invalid={hasError} required={required}>
      {label && (
        <ChakraField.Label>
          {label} {required && <ChakraField.RequiredIndicator />}
        </ChakraField.Label>
      )}
      <Input
        colorPalette="teal"
        required={required}
        value={state.value}
        onBlur={handleBlur}
        onChange={(e) => handleChange(e.target.value)}
        {...props}
      />
      {children}
      {hasError && (
        <ChakraField.ErrorText>
          {typeof error === "string" ? error : error?.message}
        </ChakraField.ErrorText>
      )}
    </ChakraField.Root>
  );
}

export function SubmitButton({ disabled, ...props }: ButtonProps) {
  const { state } = useFormContext();

  return (
    <Button
      w="100%"
      variant="surface"
      colorPalette="teal"
      type="submit"
      loading={state.isSubmitting}
      disabled={disabled || state.isSubmitting}
      {...props}
    />
  );
}

export function Form(props: BoxProps) {
  const { handleSubmit } = useFormContext();

  return (
    <Box
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
      {...props}
    />
  );
}

/**
 * Should handle a comma separated string.
 */
export function TagsField({ label }: TagsFieldProps) {
  const [input, setInput] = useState<string>("");
  const { state, handleChange } = useFieldContext<string>();
  const tags = state.value.split(",").filter(Boolean);

  return (
    <Field
      label={label}
      autoComplete="off"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
        if (e.key !== "Enter" || tags.includes(input)) {
          return;
        }
        setInput("");
        handleChange([...tags, input].join(","));
      }}
    >
      {tags.length > 0 ? (
        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
          {tags.map((tag) => (
            <Tag.Root key={tag}>
              <Tag.Label>{tag}</Tag.Label>
              <Tag.EndElement>
                <Tag.CloseTrigger
                  cursor="pointer"
                  onClick={() => {
                    handleChange(tags.filter((element) => element !== tag).join(","));
                  }}
                />
              </Tag.EndElement>
            </Tag.Root>
          ))}
        </Box>
      ) : null}
    </Field>
  );
}

export function ArchivedToggler() {
  const { state, handleChange } = useFieldContext<boolean>();

  return (
    <SegmentGroup.Root value={`${state.value}`} w="fit">
      <SegmentGroup.Item
        roundedRight="none"
        roundedLeft="sm"
        w="100%"
        cursor="pointer"
        onClick={() => handleChange(false)}
        value={`${false}`}
        border="1px solid"
        borderColor="border"
        mr="-1px"
        _checked={{
          color: "green.fg",
          bgColor: "green.subtle",
        }}
        css={{ "&::before": { display: "none" } }}
      >
        Published
      </SegmentGroup.Item>
      <SegmentGroup.Item
        rounded="none"
        w="100%"
        cursor="pointer"
        onClick={() => handleChange(true)}
        value={`${true}`}
        border="1px solid"
        borderColor="border"
        _checked={{
          color: "orange.fg",
          bgColor: "orange.subtle",
        }}
        css={{ "&::before": { display: "none" } }}
      >
        Archived
      </SegmentGroup.Item>
    </SegmentGroup.Root>
  );
}
