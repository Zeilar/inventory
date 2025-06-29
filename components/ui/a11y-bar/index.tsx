import { Flex } from "@chakra-ui/react";
import { Breadcrumbs, type BreadcrumbsProps } from "../breadcrumbs";

interface A11yBarProps {
  breadcrumbsProps?: BreadcrumbsProps;
}

export function A11yBar({ breadcrumbsProps }: A11yBarProps) {
  return (
    <Flex
      justify="space-between"
      align="center"
      gap={4}
      p={4}
      border="1px solid {colors.border}"
      bgColor="bg.panel"
      rounded="sm"
    >
      {breadcrumbsProps && <Breadcrumbs {...breadcrumbsProps} />}
    </Flex>
  );
}
