import { CloudDownloadOutlined, Layers, Receipt, Timeline, Warehouse } from "@mui/icons-material";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { DashboardCard, DashboardCardLayout } from "./(components)";
import { Suspense } from "react";
import { UnstyledLink } from "@/components";
import { ItemsTimeline } from "./(components)/dashboard-card/items-timeline";
import type { ItemsTimelineResponse } from "./api/items/timeline/route";
import { buildAppUrl } from "@/common";

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

export default async function Page() {
  return (
    <Box width="100%">
      <Typography variant="h4" mb={1.5}>
        Overview
      </Typography>
      <Box display="grid" gap={3} gridTemplateColumns="repeat(2, 1fr)">
        <Suspense
          fallback={
            <DashboardCardLayout icon={Receipt} title="Item count">
              <Skeleton width={100} />
            </DashboardCardLayout>
          }
        >
          <DashboardCard<number> title="Item count" icon={Warehouse} promise={getTotalItems()}>
            {(total) => total}
          </DashboardCard>
        </Suspense>
        <Suspense
          fallback={
            <DashboardCardLayout
              icon={Layers}
              title="Database size"
              sibling={
                <Button
                  variant="outlined"
                  startIcon={<CloudDownloadOutlined />}
                  size="large"
                  disabled
                  sx={{ ml: "auto" }}
                >
                  Download
                </Button>
              }
            >
              <Skeleton width={100} />
            </DashboardCardLayout>
          }
        >
          <DashboardCard<number>
            title="Database size"
            icon={Layers}
            promise={getDbSize()}
            sibling={
              <UnstyledLink href="/api/db/backup" download sx={{ ml: "auto" }}>
                <Button variant="outlined" startIcon={<CloudDownloadOutlined />}>
                  Download
                </Button>
              </UnstyledLink>
            }
          >
            {(dbSize) => dbSize}
          </DashboardCard>
        </Suspense>
        <Suspense
          fallback={
            <DashboardCardLayout
              icon={Timeline}
              title="Deposits"
              sx={{ gridColumn: "span 2", alignItems: "start" }}
            >
              <Skeleton height={250} sx={{ transform: "none" }} />
            </DashboardCardLayout>
          }
        >
          <DashboardCard<ItemsTimelineResponse>
            title="Deposits"
            icon={Timeline}
            promise={getItemsTimeline()}
            sx={{ gridColumn: "span 2", alignItems: "start" }}
          >
            {(value) => <ItemsTimeline value={value} />}
          </DashboardCard>
        </Suspense>
      </Box>
    </Box>
  );
}
