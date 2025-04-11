import { Box, Paper, type SvgIconTypeMap, Typography } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { ReactNode } from "react";

interface DashboardCardBaseProps {
  title: ReactNode;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  sibling?: ReactNode;
}

interface DashboardCardProps<T = unknown> extends DashboardCardBaseProps {
  promise: Promise<T>;
  children(data: T): ReactNode;
}

interface DashboardCardLayoutProps extends DashboardCardBaseProps {
  children: ReactNode;
}

export function DashboardCardLayout({
  icon: Icon,
  title,
  sibling,
  children,
}: DashboardCardLayoutProps) {
  return (
    <Paper sx={{ py: 2, px: 3, display: "flex", gap: 2, alignItems: "center" }}>
      <Box p={1} bgcolor="grey.600" display="flex" borderRadius={2}>
        <Icon color="primary" fontSize="large" />
      </Box>
      <Box display="flex" alignItems="center" gap={4} width="100%">
        <div>
          <Typography variant="body2" color="primary" mb={0.5}>
            {title}
          </Typography>
          <Typography variant="h4">{children}</Typography>
        </div>
        {sibling}
      </Box>
    </Paper>
  );
}

export async function DashboardCard<T>({
  promise,
  icon,
  title,
  children,
  sibling,
}: DashboardCardProps<T>) {
  const data = await promise;

  return (
    <DashboardCardLayout icon={icon} title={title} sibling={sibling}>
      {children(data)}
    </DashboardCardLayout>
  );
}
