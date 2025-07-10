import { Flex } from "@chakra-ui/react";
import { Breadcrumbs, type BreadcrumbsProps } from "../breadcrumbs";

interface A11yBarProps {
  breadcrumbsProps?: BreadcrumbsProps;
}

export function A11yBar({ breadcrumbsProps }: A11yBarProps) {
  return (
    <Flex justify="space-between" align="center" gap={4}>
      {breadcrumbsProps && <Breadcrumbs {...breadcrumbsProps} />}
    </Flex>
  );
}
