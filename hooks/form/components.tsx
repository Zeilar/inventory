"use client";

import { useFieldContext, useFormContext } from "./context";
import type { ZodIssueBase } from "zod";
import {
  Box,
  type BoxProps,
  Button,
  type ButtonProps,
  Field as ChakraField,
  CloseButton,
  FileUpload,
  Flex,
  Input,
  InputGroup,
  type InputProps,
  SegmentGroup,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useState, type ReactNode } from "react";
import { useStore } from "@tanstack/react-form";
import { MdUpload } from "react-icons/md";

interface TagsFieldProps {
  label?: ReactNode;
}

interface ThumbnailFieldProps {
  onChange(value: File | null): void;
}

export function Field({
  label,
  children,
  required,
  helperText,
  ...props
}: InputProps & { label?: ReactNode; helperText?: ReactNode }) {
  const field = useFieldContext<string | number>();
  const errors = useStore(field.store, ({ meta }) => meta.errors);
  const error: ZodIssueBase | string | undefined = errors.at(0);
  const hasError = Boolean(error);

  return (
    <ChakraField.Root invalid={hasError} required={required}>
      {label && (
        <ChakraField.Label>
          {label} {required && <ChakraField.RequiredIndicator />}
        </ChakraField.Label>
      )}
      <Input
        colorPalette="bg"
        required={required}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        {...props}
      />
      {helperText && <ChakraField.HelperText>{helperText}</ChakraField.HelperText>}
      {children}
      {hasError && (
        <ChakraField.ErrorText>
          {typeof error === "string" ? error : error?.message}
        </ChakraField.ErrorText>
      )}
    </ChakraField.Root>
  );
}

export function SubmitButton({ loading, ...props }: ButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={({ isSubmitting }) => isSubmitting}>
      {(isSubmitting) => (
        <Button
          w="full"
          variant="solid"
          colorPalette="bg"
          type="submit"
          loading={loading || isSubmitting}
          {...props}
        />
      )}
    </form.Subscribe>
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
      helperText="Must not contain commas."
      label={label}
      autoComplete="off"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
        if (
          e.key !== "Enter" ||
          tags.includes(input) ||
          input.includes(",") ||
          tags.some((tag) => input.split(",").includes(tag))
        ) {
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
    <Flex flexDir="column" gap={1}>
      <Text textStyle="label">Status</Text>
      <SegmentGroup.Root value={`${state.value}`} w="fit" shadow="none">
        <SegmentGroup.Item
          roundedRight="none"
          roundedLeft="sm"
          w="full"
          cursor="pointer"
          onClick={() => handleChange(false)}
          value={`${false}`}
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
          w="full"
          cursor="pointer"
          onClick={() => handleChange(true)}
          value={`${true}`}
          _checked={{
            color: "orange.fg",
            bgColor: "orange.subtle",
          }}
          css={{ "&::before": { display: "none" } }}
        >
          Archived
        </SegmentGroup.Item>
      </SegmentGroup.Root>
    </Flex>
  );
}

export function ThumbnailField({ onChange }: ThumbnailFieldProps) {
  const { state, handleChange } = useFieldContext<File | null>();
  const { value, meta } = state;
  const { errors } = meta;
  const error: ZodIssueBase | string | undefined = errors.at(0);

  return (
    <FileUpload.Root gap={1} maxW={300} accept={["image/*"]}>
      <FileUpload.HiddenInput
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          handleChange(file);
          onChange(file);
        }}
      />
      <FileUpload.Label display="flex" gap={1}>
        Thumbnail
        <Box as="span" color="fg.error">
          *
        </Box>
      </FileUpload.Label>
      <InputGroup
        startElement={<MdUpload />}
        endElement={
          <FileUpload.ClearTrigger asChild>
            <CloseButton ml={1} size="xs" variant="plain" onClick={() => handleChange(null)} />
          </FileUpload.ClearTrigger>
        }
      >
        <Input asChild>
          <FileUpload.Trigger truncate>
            {value ? value.name : <Text color="fg.muted">Select image</Text>}
          </FileUpload.Trigger>
        </Input>
      </InputGroup>
      {error && (
        <Text fontWeight={500} color="fg.error" fontSize="xs">
          {typeof error === "string" ? error : error?.message}
        </Text>
      )}
    </FileUpload.Root>
  );
}
