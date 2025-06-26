"use client";

import { Icon, Separator, Box, Button, Text, Flex, Checkbox } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { MdCheckCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

interface CustomListProps {
  checked: string[];
  items: string[];
  handleToggle(value: string): void;
  title: ReactNode;
}

interface FilesTransferListProps {
  checked: string[];
  left: string[];
  right: string[];
  onCheckedChange(value: string[]): void;
  onLeftChange(value: string[]): void;
  onRightChange(value: string[]): void;
}

function not(a: string[], b: string[]): string[] {
  return a.filter((value) => !b.includes(value));
}

function intersection(a: string[], b: string[]): string[] {
  return a.filter((value) => b.includes(value));
}

function CustomList({ checked, handleToggle, items, title }: CustomListProps) {
  return (
    <Box w="full" border="1px solid {colors.border}">
      <Text p={2} display="flex" gap={2} alignItems="center">
        {title}
      </Text>
      <Separator />
      {/* 48px is the height of a list item. Update if needed. */}
      <Flex flexDir="column" overflow="auto" h={40 * 4}>
        {items.map((value) => (
          <Button
            key={value}
            variant="ghost"
            onClick={() => handleToggle(value)}
            justifyContent="start"
          >
            <Checkbox.Root
              checked={checked.includes(value)}
              tabIndex={-1}
              cursor="pointer"
              colorPalette="teal"
            >
              <Checkbox.HiddenInput />
              {/* Need cursor pointer here as well. */}
              <Checkbox.Control cursor="pointer">
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>{value}</Checkbox.Label>
            </Checkbox.Root>
          </Button>
        ))}
      </Flex>
    </Box>
  );
}

export function FilesTransferList({
  left,
  right,
  checked,
  onLeftChange,
  onRightChange,
  onCheckedChange,
}: FilesTransferListProps) {
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  function handleToggle(value: string) {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    onCheckedChange(newChecked);
  }

  function handleAllRight() {
    onRightChange(right.concat(left));
    onLeftChange([]);
  }

  function handleCheckedRight() {
    onRightChange(right.concat(leftChecked));
    onLeftChange(not(left, leftChecked));
    onCheckedChange(not(checked, leftChecked));
  }

  function handleCheckedLeft() {
    onLeftChange(left.concat(rightChecked));
    onRightChange(not(right, rightChecked));
    onCheckedChange(not(checked, rightChecked));
  }

  function handleAllLeft() {
    onLeftChange(left.concat(right));
    onRightChange([]);
  }

  return (
    <Flex gap={4} align="center" justify="center" flexDir={["column", "row"]}>
      <CustomList
        title={
          <>
            <Icon color="fg.success" size="md">
              <MdCheckCircleOutline />
            </Icon>
            <span>Keep</span>
          </>
        }
        items={left}
        checked={checked}
        handleToggle={handleToggle}
      />
      <Flex flexDir={["row-reverse", "column"]} gap={2}>
        <Button variant="outline" size="sm" onClick={handleAllRight} disabled={left.length === 0}>
          ≫
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0}
        >
          &gt;
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCheckedLeft}
          disabled={rightChecked.length === 0}
        >
          &lt;
        </Button>
        <Button variant="outline" size="sm" onClick={handleAllLeft} disabled={right.length === 0}>
          ≪
        </Button>
      </Flex>
      <CustomList
        title={
          <>
            <Icon color="fg.error" size="md">
              <MdRemoveCircleOutline />
            </Icon>
            <span>Remove</span>
          </>
        }
        items={right}
        checked={checked}
        handleToggle={handleToggle}
      />
    </Flex>
  );
}
