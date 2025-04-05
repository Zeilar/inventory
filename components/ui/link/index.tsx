"use client";

import { styled } from "@mui/material";
import NextLink from "next/link";

export const Link = styled(NextLink)(({ theme }) => ({
  color: theme.palette.primary.dark,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const UnstyledLink = styled(NextLink)({
  color: "inherit",
  textDecoration: "none",
});
