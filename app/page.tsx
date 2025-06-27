import { MdCloud, MdLayers, MdStorage, MdTimeline, MdWarehouse } from "react-icons/md";
import { DashboardCard, DashboardCardLayout } from "./(components)";
import { Suspense } from "react";
import { A11yBar, UnstyledLink } from "@/components";
import { ItemsTimeline } from "./(components)/dashboard-card/items-timeline";
import type { ItemsTimelineResponse } from "./api/items/timeline/route";
import { buildAppUrl } from "@/common";
import prettyBytes from "pretty-bytes";
import { Box, Button, Flex, Skeleton } from "@chakra-ui/react";

async function getItemsTimeline(): Promise<ItemsTimelineResponse> {
  const res = await fetch(buildAppUrl("/api/items/timeline"));
  return res.json();
}

async function getTotalItems(): Promise<number> {
  const res = await fetch(buildAppUrl("/api/items/total"));
  return res.json();
}

async function getDbSize(): Promise<number> {
  const res = await fetch(buildAppUrl("/api/db/total"));
  return res.json();
}

async function getStorageSize(): Promise<number> {
  const res = await fetch(buildAppUrl("/api/files/total"));
  return res.json();
}

export default async function Page() {
  return (
    <Flex flexDir="column" gap={2} m={4}>
      <A11yBar breadcrumbsProps={{ current: "Home" }} />
      <Box display="grid" gap={2} gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}>
        <Suspense
          fallback={
            <DashboardCardLayout icon={MdWarehouse} title="Item count">
              <Skeleton w={100} />
            </DashboardCardLayout>
          }
        >
          <DashboardCard<number> title="Item count" icon={MdWarehouse} promise={getTotalItems()}>
            {(total) => total}
          </DashboardCard>
        </Suspense>
        <Suspense
          fallback={
            <DashboardCardLayout
              icon={MdLayers}
              title="Database size"
              sibling={
                <Button variant="surface" colorPalette="teal" ml="auto">
                  <MdCloud />
                  Download
                </Button>
              }
            >
              <Skeleton w={100} />
            </DashboardCardLayout>
          }
        >
          <DashboardCard<number>
            title="Database size"
            icon={MdLayers}
            promise={getDbSize()}
            sibling={
              <UnstyledLink href="/api/db/backup" download ml={[0, "auto"]}>
                <Button variant="surface" colorPalette="teal">
                  <MdCloud />
                  Download
                </Button>
              </UnstyledLink>
            }
          >
            {(dbSize) => dbSize}
          </DashboardCard>
        </Suspense>
        <Box display={["none", "contents"]}>
          <Suspense
            fallback={
              <DashboardCardLayout
                icon={MdTimeline}
                title="Deposits"
                css={{ gridColumn: "span 2", alignItems: "start" }}
              >
                <Skeleton height={250} />
              </DashboardCardLayout>
            }
          >
            <DashboardCard<ItemsTimelineResponse>
              title="Deposits"
              icon={MdTimeline}
              promise={getItemsTimeline()}
              css={{ gridColumn: "span 2", alignItems: "start" }}
            >
              {(value) => (
                <Box py={4} pr={4} w="full">
                  <ItemsTimeline value={value} />
                </Box>
              )}
            </DashboardCard>
          </Suspense>
        </Box>
        <Suspense
          fallback={
            <DashboardCardLayout
              icon={MdStorage}
              title="Storage"
              sibling={
                <UnstyledLink href="/api/files/backup" download ml={[0, "auto"]}>
                  <Button variant="surface" colorPalette="teal">
                    <MdCloud />
                    Download
                  </Button>
                </UnstyledLink>
              }
            >
              <Skeleton w={100} />
            </DashboardCardLayout>
          }
        >
          <DashboardCard<number>
            icon={MdStorage}
            title="Storage"
            promise={getStorageSize()}
            sibling={
              <UnstyledLink href="/api/files/backup" download ml={[0, "auto"]}>
                <Button variant="surface" colorPalette="teal">
                  <MdCloud />
                  Download
                </Button>
              </UnstyledLink>
            }
          >
            {(value) => prettyBytes(value)}
          </DashboardCard>
        </Suspense>
      </Box>
    </Flex>
  );
}
