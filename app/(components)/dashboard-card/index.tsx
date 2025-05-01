import { Box, Paper, type PaperProps, type SvgIconTypeMap, Typography } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { ReactNode } from "react";

interface DashboardCardBaseProps {
  title: ReactNode;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  sibling?: ReactNode;
  sx?: PaperProps["sx"];
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
  sx,
}: DashboardCardLayoutProps) {
  return (
    <Paper sx={{ p: 1.5, display: "flex", gap: 3, alignItems: "center", ...sx }}>
      <Box p={1} bgcolor="grey.500" display="flex" borderRadius={2}>
        <Icon color="primary" fontSize="large" />
      </Box>
      <Box display="flex" alignItems="center" gap={3} width="100%">
        <Box width="100%">
          <Typography variant="overline" color="primary" fontWeight={500}>
            {title}
          </Typography>
          <Typography variant="h5">{children}</Typography>
        </Box>
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
  sx,
}: DashboardCardProps<T>) {
  const data = await promise;

  return (
    <DashboardCardLayout icon={icon} title={title} sibling={sibling} sx={sx}>
      {children(data)}
    </DashboardCardLayout>
  );
}
