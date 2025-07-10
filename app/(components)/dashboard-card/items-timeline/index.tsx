"use client";

import type { ItemsTimelineResponse } from "@/app/api/items/timeline/route";
import { Chart, useChart } from "@chakra-ui/charts";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { TIMELINE_HEIGHT } from "./config";

interface ItemsTimelineProps {
  timeline: ItemsTimelineResponse;
}

export function ItemsTimeline({ timeline }: ItemsTimelineProps) {
  const chart = useChart({
    data: timeline.days.map((day, index) => ({
      date: day,
      Deposits: timeline.data[index],
    })),
    series: [{ name: "Deposits", color: "bg.solid" }],
  });

  return (
    <Chart.Root chart={chart} height={["auto", TIMELINE_HEIGHT]}>
      <LineChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border")} vertical={false} />
        <XAxis
          dataKey={chart.key("date")}
          label={{
            value: "Date",
            position: "insideBottom",
            offset: -10,
            style: { fill: "var(--chakra-colors-fg-muted)" },
          }}
        />
        <YAxis
          label={{
            value: "Amount",
            angle: -90,
            style: { fill: "var(--chakra-colors-fg-muted)" },
          }}
        />
        {chart.series.map((item) => (
          <Line
            key={item.name}
            dataKey={chart.key(item.name)}
            stroke={chart.color(item.color)}
            strokeWidth={2}
            dot
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </Chart.Root>
  );
}
