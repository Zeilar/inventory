import { Flex } from "@chakra-ui/react";
import { Breadcrumbs, type BreadcrumbsProps } from "../breadcrumbs";
import { ColorModeButton } from "../color-mode";

interface A11yBarProps {
  breadcrumbsProps: BreadcrumbsProps;
}

export function A11yBar({ breadcrumbsProps }: A11yBarProps) {
  return (
    <Flex
      justify="space-between"
      gap={4}
      p={4}
      borderBottom="1px solid"
      borderBottomColor="border"
      bgColor="bg.panel"
      alignItems="center"
    >
      <Breadcrumbs {...breadcrumbsProps} />
      <ColorModeButton />
    </Flex>
  );
}
