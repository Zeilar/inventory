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
      gap={4}
      py={2}
      px={4}
      borderBottom="1px solid"
      borderBottomColor="border"
      bgColor="bg.panel"
      alignItems="center"
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
