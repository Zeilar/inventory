import { ItemsTimeline } from "./(components)/dashboard-card/items-timeline";
import { buildAppUrl } from "@/common";
import prettyBytes from "pretty-bytes";
import { ClientOnly } from "@chakra-ui/react";
import { DashboardLayout, DashboardLayoutLoading } from "./(components)/dashboard-layout";

export default async function Page() {
  const [totalItems, dbSize, timeline, storageSize] = await Promise.all(
    ["/api/items/total", "/api/db/total", "/api/items/timeline", "/api/files/total"].map(
      async (route) => (await fetch(buildAppUrl(route))).json()
    )
  );

  return (
    <ClientOnly fallback={<DashboardLayoutLoading />}>
      <DashboardLayout
        itemCount={totalItems}
        dbSize={dbSize}
        timeline={<ItemsTimeline timeline={timeline} />}
        storageSize={prettyBytes(storageSize)}
      />
    </ClientOnly>
  );
}
