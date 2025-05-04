import { Params } from "@/app/types";
import { UnstyledLink } from "@/components";
import type { Item } from "@/features/db/schema";
import { AttachFile, Download, Inventory, Numbers } from "@mui/icons-material";
import { Box, Button, Paper, type SvgIconTypeMap, Typography } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { PropsWithChildren, ReactNode } from "react";

interface InfoBoxProps extends PropsWithChildren {
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  title: ReactNode;
}

function InfoBox({ icon: Icon, children, title }: InfoBoxProps) {
  return (
    <Box display="flex" flexDirection="column" gap={0.75}>
      <Box display="flex" gap={1.5} alignItems="center">
        <Icon color="primary" />
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Paper sx={{ p: 1.5, width: "fit-content", minWidth: 150 }}>{children}</Paper>
    </Box>
  );
}

export default async function Page({ params }: Params<"id">) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/items/${id}`);
  const { title, quantity, articleId, files }: Item = await res.json();

  const parsedFiles = files.split(",").filter(Boolean);

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h4">{title}</Typography>
      <InfoBox icon={Inventory} title="Quantity">
        {quantity}
      </InfoBox>
      <InfoBox icon={Numbers} title="Article id">
        {articleId || "N/A"}
      </InfoBox>
      <InfoBox icon={AttachFile} title="Files">
        <Box display="flex" flexDirection="column" gap={0.75}>
          {parsedFiles.length
            ? parsedFiles.map((file, i) => (
                <UnstyledLink key={`${file}-${i}`} href={`/api/file/${id}/${file}`} download>
                  <Button startIcon={<Download />}>{file}</Button>
                </UnstyledLink>
              ))
            : "N/A"}
        </Box>
      </InfoBox>
    </Box>
  );
}
