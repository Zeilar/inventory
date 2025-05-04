import { Params } from "@/app/types";
import { UnstyledLink } from "@/components";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { Item } from "@/features/db/schema";
import { AttachFile, DateRange, Download, Fingerprint, Numbers } from "@mui/icons-material";
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
      <Box display="flex" gap={0.75} alignItems="center">
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
  const { title, quantity, articleId, files, createdAt }: Item = await res.json();

  const parsedFiles = files.split(",").filter(Boolean);

  return (
    <div>
      <Box mb={1.5}>
        <Breadcrumbs
          hrefs={[
            { href: "/", label: "Home" },
            { href: "/items", label: "Items" },
          ]}
          current={title}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={3}>
        <Box display="flex" gap={3} justifyContent="space-between" alignItems="center">
          <Typography variant="h4" overflow="hidden" textOverflow="ellipsis">
            {title}
          </Typography>
          <UnstyledLink href={`/items/${id}/update`}>
            <Button variant="contained">Edit</Button>
          </UnstyledLink>
        </Box>
        <InfoBox icon={Numbers} title="Quantity">
          {quantity}
        </InfoBox>
        <InfoBox icon={Fingerprint} title="Article id">
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
        <InfoBox icon={DateRange} title="Deposited at">
          {new Date(createdAt).toLocaleString()}
        </InfoBox>
      </Box>
    </div>
  );
}
