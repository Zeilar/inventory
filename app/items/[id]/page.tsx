import type { Params, SearchParams } from "@/app/types";
import { UnstyledLink, A11yBar, Heading, Link } from "@/components";
import type { Item, ItemHistory } from "@/features/db/schema";
import type { PropsWithChildren, ReactNode } from "react";
import { VersionSelect } from "./version-select";
import { notFound } from "next/navigation";
import { Badge, Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons/lib";
import {
  MdOutlineArchive,
  MdOutlineAttachFile,
  MdOutlineDateRange,
  MdOutlineDownload,
  MdOutlineFingerprint,
  MdOutlineLink,
  MdOutlineNumbers,
  MdOutlineOpenInNew,
  MdOutlineSell,
  MdOutlineTag,
  MdOutlineUpdate,
} from "react-icons/md";
import { apiFetch } from "@/app/api/api-fetch";

interface InfoBoxProps extends PropsWithChildren {
  icon: IconType;
  title: ReactNode;
}

function InfoBox({ icon: IconComponent, children, title }: InfoBoxProps) {
  return (
    <Box
      display={["flex", "grid"]}
      gap={[2, 4]}
      gridTemplateColumns={["none", "200px 1fr"]}
      flexDir={["column", "unset"]}
      alignItems="start"
      border={["1px solid {colors.border}", 0]}
      p={[4, 0]}
      rounded={["sm", "none"]}
    >
      <Flex gap={[2, 4]} h="40px" align="center">
        <Icon color="bg.fg" size="md">
          <IconComponent />
        </Icon>
        <Text>{title}</Text>
      </Flex>
      <Box alignSelf={["unset", "center"]}>{children}</Box>
    </Box>
  );
}

export default async function Page({
  params,
  searchParams,
}: Params<"id"> & SearchParams<"version">) {
  const { id } = await params;
  const { version = "" } = await searchParams;
  const res = await apiFetch(`/api/items/${id}`, "GET", null, {
    revalidate: 31_556_926,
    tags: [`items-${id}`],
  });
  const item: Item = await res.json();

  if (!res.ok) {
    notFound();
  }

  // For some reason clearing the cache in the update action doesn't work with this fetch.
  const historyRes = await apiFetch(`/api/items/${id}/history`);
  const history: ItemHistory[] = await historyRes.json();

  const foundPastVersion = history.find(({ createdAt }) => createdAt === version);
  const itemToRender = foundPastVersion ?? item;

  const { archived, archivedAt, articleId, files, links, price, quantity, tags, title } =
    itemToRender;

  const parsedFiles = files.split(",").filter(Boolean);
  const parsedLinks = links.split(",").filter(Boolean);
  const parsedTags = tags.split(",").filter(Boolean);

  return (
    <Flex flexDir="column" gap={4} m={[4, 8]}>
      <A11yBar
        breadcrumbsProps={{
          hrefs: [
            { href: "/", label: "Home" },
            { href: "/items", label: "Items" },
          ],
          current: item.title,
        }}
      />
      <Flex gap={4} justify="space-between" flexDir={["column", "row"]}>
        <Heading size="2xl" as="h2">
          {title}
        </Heading>
        <Flex gap={2} justify="space-between">
          <VersionSelect options={history.flatMap(({ createdAt }) => createdAt)} value={version} />
          <UnstyledLink href={`/items/${id}/edit`}>
            <Button variant="solid" colorPalette="bg" h="40px">
              Edit
            </Button>
          </UnstyledLink>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap={[2, 4]}>
        <InfoBox icon={MdOutlineNumbers} title="Quantity">
          {quantity}
        </InfoBox>
        <InfoBox icon={MdOutlineFingerprint} title="Article id">
          {articleId || "-"}
        </InfoBox>
        <InfoBox icon={MdOutlineArchive} title="Archived">
          {archived && archivedAt
            ? new Date(archivedAt).toLocaleString(process.env.NEXT_PUBLIC_LOCALE)
            : "No"}
        </InfoBox>
        <InfoBox icon={MdOutlineTag} title="Tags">
          <Flex display="flex" gap={2} flexWrap="wrap">
            {parsedTags.length > 0
              ? parsedTags.map((tag) => (
                  <Link key={tag} href={`/items?tags=${tag}`}>
                    <Badge size="lg" colorPalette="bg">
                      {tag}
                    </Badge>
                  </Link>
                ))
              : "-"}
          </Flex>
        </InfoBox>
        <InfoBox icon={MdOutlineAttachFile} title="Files">
          <Flex flexDir="column" gap={2}>
            {parsedFiles.length
              ? parsedFiles.map((file, i) => (
                  <UnstyledLink
                    key={`${file}-${i}`}
                    href={`/api/file/${id}/${file}`}
                    download
                    as={foundPastVersion ? "span" : undefined}
                    cursor={foundPastVersion ? "not-allowed" : undefined}
                  >
                    <Button colorPalette="bg" variant="outline">
                      <MdOutlineDownload />
                      {file}
                    </Button>
                  </UnstyledLink>
                ))
              : "-"}
          </Flex>
        </InfoBox>
        <InfoBox icon={MdOutlineSell} title="Price">
          {price || "-"}
        </InfoBox>
        <InfoBox icon={MdOutlineLink} title="Links">
          <Flex flexDir="column" gap={2}>
            {parsedLinks.length
              ? parsedLinks.map((link, i) => (
                  <Link key={`${link}-${i}`} href={link} target="_blank">
                    <Badge size="lg" colorPalette="bg">
                      <MdOutlineOpenInNew />
                      <Text maxW="calc(100vw - (var(--chakra-spacing-1) * 31))" truncate>
                        {link}
                      </Text>
                    </Badge>
                  </Link>
                ))
              : "-"}
          </Flex>
        </InfoBox>
        <InfoBox icon={MdOutlineDateRange} title="Deposited">
          {new Date(item.createdAt).toLocaleString(process.env.NEXT_PUBLIC_LOCALE)}
        </InfoBox>
        <InfoBox icon={MdOutlineUpdate} title="Updated">
          {new Date(item.updatedAt).toLocaleString(process.env.NEXT_PUBLIC_LOCALE)}
        </InfoBox>
      </Flex>
    </Flex>
  );
}
