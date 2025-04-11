import { CloudDownloadOutlined, LayersOutlined, Receipt } from "@mui/icons-material";
import { Box, Button, CircularProgress } from "@mui/material";
import prettyBytes from "pretty-bytes";
import { DashboardCard } from "./(components)";
import { Suspense } from "react";
import { UnstyledLink } from "@/components";

async function getTotalReceipts(): Promise<number> {
  const res = await fetch("http://localhost:3000/api/receipts/total", {
    next: {
      revalidate: 31_556_926,
      tags: ["receipts-total"],
    },
  });
  return res.json();
}

async function getDbSize(): Promise<number> {
  const res = await fetch("http://localhost:3000/api/db/total");
  return res.json();
}

export default async function Page() {
  return (
    <Box p={2} width="100%">
      <Box display="grid" gap={2} gridTemplateColumns="repeat(3, 1fr)">
        <Suspense fallback={<CircularProgress />}>
          <DashboardCard<number> title="Receipts" icon={Receipt} promise={getTotalReceipts()}>
            {(total) => total}
          </DashboardCard>
        </Suspense>
        <Suspense fallback={<CircularProgress />}>
          <DashboardCard<number>
            title="Database size"
            icon={LayersOutlined}
            promise={getDbSize()}
            sibling={
              <UnstyledLink href="/api/db/backup" download sx={{ ml: "auto" }}>
                <Button variant="outlined" startIcon={<CloudDownloadOutlined />} size="large">
                  Download
                </Button>
              </UnstyledLink>
            }
          >
            {(dbSize) => prettyBytes(dbSize)}
          </DashboardCard>
        </Suspense>
      </Box>
    </Box>
  );
}
