"use client";

import { styled } from "@mui/material";
import NextLink from "next/link";

export const Link = styled(NextLink)(({ theme }) => ({
  width: "fit-content",
  color: theme.palette.primary.dark,
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const UnstyledLink = styled(NextLink)({
  color: "inherit",
  textDecoration: "none",
});
