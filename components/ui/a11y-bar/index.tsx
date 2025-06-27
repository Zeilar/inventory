import { ClientOnly, Flex, Skeleton } from "@chakra-ui/react";
import { Breadcrumbs, type BreadcrumbsProps } from "../breadcrumbs";
import { ColorModeButton } from "../color-mode";

interface A11yBarProps {
  breadcrumbsProps?: BreadcrumbsProps;
}

export function A11yBar({ breadcrumbsProps }: A11yBarProps) {
  return (
    <Flex
      justify="space-between"
      align="center"
      gap={4}
      py={2}
      px={4}
      border="1px solid {colors.border}"
      bgColor="bg.panel"
      rounded="sm"
    >
      {breadcrumbsProps && <Breadcrumbs {...breadcrumbsProps} />}
      <Flex ml="auto" h="36px" justify="center" align="center">
        <ClientOnly fallback={<Skeleton w="16px" h="16px" mr="10px" />}>
          <ColorModeButton />
        </ClientOnly>
      </Flex>
    </Flex>
  );
}
