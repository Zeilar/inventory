import { Params, SearchParams } from "@/app/types";
import { buildAppUrl } from "@/common";
import { UnstyledLink, Breadcrumbs } from "@/components";
import type { Item, ItemHistory } from "@/features/db/schema";
import {
  ArchiveOutlined,
  AttachFileOutlined,
  DateRangeOutlined,
  Download,
  FingerprintOutlined,
  LinkOutlined,
  NumbersOutlined,
  OpenInNewOutlined,
  SellOutlined,
  TagOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Paper,
  type SvgIconTypeMap,
  Typography,
} from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { PropsWithChildren, ReactNode } from "react";
import { VersionSelect } from "./version-select";
import { notFound } from "next/navigation";

interface InfoBoxProps extends PropsWithChildren {
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  title: ReactNode;
}

function InfoBox({ icon: Icon, children, title }: InfoBoxProps) {
  return (
    <Box component={Paper} display="flex" gap={3} justifyContent="space-between" p={1.5}>
      <Box display="flex" gap={1.5}>
        <Icon color="primary" />
        <Typography>{title}</Typography>
      </Box>
      <Typography>{children}</Typography>
    </Box>
  );
}

export default async function Page({
  params,
  searchParams,
}: Params<"id"> & SearchParams<"version">) {
  const { id } = await params;
  const { version = "" } = await searchParams;
  const res = await fetch(buildAppUrl(`/api/items/${id}`), {
    next: { revalidate: 31_556_926, tags: [`items-${id}`] },
  });
  const item: Item = await res.json();

  if (!res.ok) {
    notFound();
  }

  const historyRes = await fetch(buildAppUrl(`/api/items/${id}/history`), {
    next: { revalidate: 31_556_926, tags: [`items-history-${id}`] },
  });
  const history: ItemHistory[] = await historyRes.json();

  const versionToRender = history.find(({ createdAt }) => createdAt === version) ?? item;

  const { archived, archivedAt, articleId, createdAt, files, links, price, quantity, tags, title } =
    versionToRender;

  const parsedFiles = files.split(",").filter(Boolean);
  const parsedLinks = links.split(",").filter(Boolean);

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
      <Box display="flex" flexDirection="column" gap={1.5}>
        <Box display="flex" gap={3} justifyContent="space-between" alignItems="center">
          <Typography variant="h4" overflow="hidden" textOverflow="ellipsis">
            {title}
          </Typography>
          <Box display="flex" gap={1.5}>
            <FormControl sx={{ width: 200 }} size="small">
              <InputLabel>Version</InputLabel>
              <VersionSelect
                options={history.flatMap(({ createdAt }) => createdAt)}
                value={version}
              />
            </FormControl>
            <UnstyledLink href={`/items/${id}/update`}>
              <Button variant="contained" sx={{ height: 40 }}>
                Edit
              </Button>
            </UnstyledLink>
          </Box>
        </Box>
        <Divider />
        <InfoBox icon={NumbersOutlined} title="Quantity">
          {quantity}
        </InfoBox>
        <InfoBox icon={FingerprintOutlined} title="Article id">
          {articleId || "-"}
        </InfoBox>
        <InfoBox icon={ArchiveOutlined} title="Archived">
          {archived && archivedAt
            ? new Date(archivedAt).toLocaleString(process.env.NEXT_PUBLIC_LOCALE)
            : "No"}
        </InfoBox>
        <InfoBox icon={TagOutlined} title="Tags">
          <Box component="span" display="flex" gap={1.5} flexWrap="wrap" justifyContent="end">
            {tags
              .split(",")
              .filter(Boolean)
              .map((tag) => (
                <Chip component="span" key={tag} label={tag} />
              ))}
          </Box>
        </InfoBox>
        <InfoBox icon={AttachFileOutlined} title="Files">
          <Box component="span" display="flex" flexDirection="column" gap={0.75} alignItems="end">
            {parsedFiles.length
              ? parsedFiles.map((file, i) => (
                  <UnstyledLink key={`${file}-${i}`} href={`/api/file/${id}/${file}`} download>
                    <Button startIcon={<Download />} sx={{ textTransform: "none" }}>
                      {file}
                    </Button>
                  </UnstyledLink>
                ))
              : "-"}
          </Box>
        </InfoBox>
        <InfoBox icon={SellOutlined} title="Price">
          {price || "-"}
        </InfoBox>
        <InfoBox icon={LinkOutlined} title="Links">
          <Box component="span" display="flex" flexDirection="column" gap={0.75} alignItems="end">
            {parsedLinks.length
              ? parsedLinks.map((link, i) => (
                  <UnstyledLink key={`${link}-${i}`} href={link} target="_blank">
                    <Button startIcon={<OpenInNewOutlined />} sx={{ textTransform: "none" }}>
                      {link}
                    </Button>
                  </UnstyledLink>
                ))
              : "-"}
          </Box>
        </InfoBox>
        <InfoBox icon={DateRangeOutlined} title="Deposited at">
          {new Date(createdAt).toLocaleString(process.env.NEXT_PUBLIC_LOCALE)}
        </InfoBox>
      </Box>
    </div>
  );
}
