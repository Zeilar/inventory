import { Box, Breadcrumb } from "@chakra-ui/react";
import { Link } from "../link";
import { Fragment } from "react";

export interface BreadcrumbsProps {
  /**
   * Remember the breadcrumbs will follow this order, which is important.
   */
  hrefs?: Array<{ href: string; label: string }>;
  current: string;
}

export function Breadcrumbs({ current, hrefs }: BreadcrumbsProps) {
  return (
    <Breadcrumb.Root size="lg">
      <Breadcrumb.List>
        {hrefs?.map(({ href, label }) => (
          <Fragment key={href}>
            <Breadcrumb.Link as={Link} href={href}>
              {label}
            </Breadcrumb.Link>
            <Breadcrumb.Separator>
              <Box mx={1}>/</Box>
            </Breadcrumb.Separator>
          </Fragment>
        ))}
        <Breadcrumb.CurrentLink>{current}</Breadcrumb.CurrentLink>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
