import { Box, Paper, type SvgIconTypeMap, Typography } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { ReactNode } from "react";

interface DashboardCardProps<T = unknown> {
  title: ReactNode;
  promise: Promise<T>;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  children(data: T): ReactNode;
  sibling?: ReactNode;
}

export async function DashboardCard<T>({
  promise,
  icon: Icon,
  title,
  children,
  sibling,
}: DashboardCardProps<T>) {
  const data = await promise;

  return (
    <Paper sx={{ py: 2, px: 3, display: "flex", gap: 2, alignItems: "center" }}>
      <Box p={1} bgcolor="grey.600" display="flex" borderRadius={2}>
        <Icon color="primary" fontSize="large" />
      </Box>
      <Box display="flex" alignItems="center" gap={4} width="100%">
        <div>
          <Typography variant="body2" color="info" mb={0.5}>
            {title}
          </Typography>
          <Typography variant="h4">{children(data)}</Typography>
        </div>
        {sibling}
      </Box>
    </Paper>
  );
}
