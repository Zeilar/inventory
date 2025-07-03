import { UnstyledLink } from "@/components";
import { Box, Button, Skeleton } from "@chakra-ui/react";
import { DashboardCardLayout } from "../dashboard-card";
import { MdDownload, MdLayers, MdStorage, MdTimeline, MdWarehouse } from "react-icons/md";
import { ReactNode } from "react";
import { DashboardLayoutSkeletonText } from "./skeleton-text";
import { TIMELINE_HEIGHT } from "../dashboard-card/items-timeline/config";

interface DashboardLayoutProps {
  itemCount: ReactNode;
  dbSize: ReactNode;
  timeline: ReactNode;
  storageSize: ReactNode;
}

export function DashboardLayoutLoading() {
  return (
    <DashboardLayout
      itemCount={<DashboardLayoutSkeletonText w={75} />}
      dbSize={<DashboardLayoutSkeletonText w={100} />}
      timeline={<Skeleton h={TIMELINE_HEIGHT} />}
      storageSize={<DashboardLayoutSkeletonText w={100} />}
    />
  );
}

export function DashboardLayout({
  dbSize,
  itemCount,
  storageSize,
  timeline,
}: DashboardLayoutProps) {
  return (
    <Box
      display="grid"
      gap={[4, 8]}
      gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
      gridAutoRows="min-content"
      m={[4, 8]}
    >
      <DashboardCardLayout title="Item count" icon={MdWarehouse}>
        {itemCount}
      </DashboardCardLayout>
      <DashboardCardLayout
        title="Database size"
        icon={MdLayers}
        sibling={
          <UnstyledLink href="/api/db/backup" download ml={[0, "auto"]}>
            <Button variant="surface" colorPalette="teal">
              <MdDownload />
              Download
            </Button>
          </UnstyledLink>
        }
      >
        {dbSize}
      </DashboardCardLayout>
      <DashboardCardLayout
        title="Deposits"
        icon={MdTimeline}
        css={{ gridColumn: ["auto", "span 2"], alignItems: "start" }}
      >
        <Box py={4} pr={4} w="full">
          {timeline}
        </Box>
      </DashboardCardLayout>
      <DashboardCardLayout
        icon={MdStorage}
        title="Storage"
        sibling={
          <UnstyledLink href="/api/files/backup" download ml={[0, "auto"]}>
            <Button variant="surface" colorPalette="teal">
              <MdDownload />
              Download
            </Button>
          </UnstyledLink>
        }
      >
        {storageSize}
      </DashboardCardLayout>
    </Box>
  );
}
