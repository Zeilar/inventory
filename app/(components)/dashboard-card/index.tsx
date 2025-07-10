import { Alert, DataList, Flex, Icon, type SystemStyleObject } from "@chakra-ui/react";
import type { ReactNode } from "react";
import type { IconType } from "react-icons/lib";

interface DashboardCardBaseProps {
  title: ReactNode;
  icon: IconType;
  sibling?: ReactNode;
  css?: SystemStyleObject;
}

interface DashboardCardProps<T = unknown> extends DashboardCardBaseProps {
  promise: Promise<T>;
  children(data: T): ReactNode;
}

interface DashboardCardLayoutProps extends DashboardCardBaseProps {
  children: ReactNode;
}

export function DashboardCardLayout({
  icon: IconComponent,
  title,
  sibling,
  children,
  css,
}: DashboardCardLayoutProps) {
  return (
    <Flex rounded="sm" bgColor="bg.panel" p={4} gap={4} align="center" css={css}>
      <Flex p={2}>
        <Icon color="bg.solid" size="2xl">
          <IconComponent />
        </Icon>
      </Flex>
      <Flex gap={4} w="full" align="center">
        <DataList.Root size="lg" w="full">
          <DataList.Item>
            <DataList.ItemLabel>{title}</DataList.ItemLabel>
            <DataList.ItemValue>{children}</DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>
        {sibling}
      </Flex>
    </Flex>
  );
}

export async function DashboardCard<T>({
  promise,
  icon,
  title,
  children,
  sibling,
  css,
}: DashboardCardProps<T>) {
  try {
    const data = await promise;

    return (
      <DashboardCardLayout icon={icon} title={title} sibling={sibling} css={css}>
        {children(data)}
      </DashboardCardLayout>
    );
  } catch (error) {
    console.error(error);

    return (
      <DashboardCardLayout icon={icon} title={title} sibling={sibling} css={css}>
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>An unexpected error occurred.</Alert.Title>
          </Alert.Content>
        </Alert.Root>
      </DashboardCardLayout>
    );
  }
}
