import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import { Link } from "../link";

interface BreadcrumbsProps {
  /**
   * Remember the breadcrumbs will follow this order, which is important.
   */
  hrefs: Array<{ href: string; label: string }>;
  current: string;
}

export function Breadcrumbs({ current, hrefs }: BreadcrumbsProps) {
  return (
    <MuiBreadcrumbs>
      {hrefs.map(({ href, label }) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
      <Typography>{current}</Typography>
    </MuiBreadcrumbs>
  );
}
