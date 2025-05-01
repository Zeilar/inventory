"use client";

import type { ItemsTimelineResponse } from "@/app/api/items/timeline/route";
import { useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts";

interface TestProps {
  value: ItemsTimelineResponse;
}

export function ItemsTimeline({ value }: TestProps) {
  const { palette } = useTheme();

  return (
    <LineChart
      colors={[palette.primary.main]}
      xAxis={[{ scaleType: "band", data: value.days }]}
      series={[{ data: value.data }]}
      height={250}
    />
  );
}
