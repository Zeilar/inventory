"use client";

import { CheckCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  checkboxClasses,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { type ReactNode, useEffect, useState } from "react";

interface CustomListProps {
  checked: string[];
  items: string[];
  handleToggle(value: string): void;
  title: ReactNode;
}

interface FilesTransferListProps {
  initial: string[];
  onChange(value: string[]): void;
}

function not(a: string[], b: string[]): string[] {
  return a.filter((value) => !b.includes(value));
}

function intersection(a: string[], b: string[]): string[] {
  return a.filter((value) => b.includes(value));
}

function CustomList({ checked, handleToggle, items, title }: CustomListProps) {
  return (
    <Paper sx={{ width: "100%" }}>
      <Typography variant="body2" p={1.5} display="flex" alignItems="center" gap={0.75}>
        {title}
      </Typography>
      <Divider />
      <List dense sx={{ height: 200, overflow: "auto", py: 0 }}>
        {items.map((value: string) => (
          <ListItemButton
            key={value}
            role="listitem"
            onClick={() => handleToggle(value)}
            sx={{ py: 0, pl: 0, pr: 1.5, borderRadius: 0 }}
          >
            <ListItemIcon sx={{ [`.${checkboxClasses.root}`]: { p: 1.5 } }}>
              <Checkbox checked={checked.includes(value)} tabIndex={-1} disableRipple />
            </ListItemIcon>
            <ListItemText primary={value} sx={{ m: 0, ml: -0.75 }} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}

export function FilesTransferList({ initial, onChange }: FilesTransferListProps) {
  const [checked, setChecked] = useState<string[]>([]);
  const [left, setLeft] = useState<string[]>(initial);
  const [right, setRight] = useState<string[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    onChange(right);
  }, [right, onChange]);

  /**
   * Reset inputs when the existing files change.
   */
  useEffect(() => {
    setChecked([]);
    setLeft(initial);
    setRight([]);
  }, [initial]);

  function handleToggle(value: string) {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  }

  function handleAllRight() {
    setRight(right.concat(left));
    setLeft([]);
  }

  function handleCheckedRight() {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  }

  function handleCheckedLeft() {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  }

  function handleAllLeft() {
    setLeft(left.concat(right));
    setRight([]);
  }

  return (
    <Box display="flex" gap={1.5} alignItems="center" justifyContent="center">
      <CustomList
        title={
          <>
            <CheckCircleOutline color="success" />
            <span>Keep</span>
          </>
        }
        items={left}
        checked={checked}
        handleToggle={handleToggle}
      />
      <Box display="flex" flexDirection="column" gap={1.5}>
        <Button
          variant="outlined"
          size="small"
          onClick={handleAllRight}
          disabled={left.length === 0}
        >
          ≫
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0}
        >
          &gt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={handleCheckedLeft}
          disabled={rightChecked.length === 0}
        >
          &lt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={handleAllLeft}
          disabled={right.length === 0}
        >
          ≪
        </Button>
      </Box>
      <CustomList
        title={
          <>
            <RemoveCircleOutline color="error" />
            <span>Remove</span>
          </>
        }
        items={right}
        checked={checked}
        handleToggle={handleToggle}
      />
    </Box>
  );
}
