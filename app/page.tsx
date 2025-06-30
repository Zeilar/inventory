import { ItemsTimeline } from "./(components)/dashboard-card/items-timeline";
import prettyBytes from "pretty-bytes";
import { ClientOnly } from "@chakra-ui/react";
import { DashboardLayout, DashboardLayoutLoading } from "./(components)/dashboard-layout";
import { apiFetch } from "./api/api-fetch";

export default async function Page() {
  const [totalItems, dbSize, timeline, storageSize] = await Promise.all(
    ["/api/items/total", "/api/db/total", "/api/items/timeline", "/api/files/total"].map(
      async (route) => (await apiFetch(route)).json()
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
