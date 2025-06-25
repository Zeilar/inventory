import { Box, Button, Card, CardActions, CardContent, Checkbox, Skeleton } from "@mui/material";
import { ItemsContainerLayout, ItemsHeaderLayout } from "./(components)";
import { ItemSearchFieldLayout } from "@/features/item/components";
import { Link } from "@/components";
import { Delete, Edit } from "@mui/icons-material";
import { Suspense } from "react";
import { getSettings } from "../api/settings/getSettings";

export async function ItemsCardsSkeletons() {
  const { itemsPerPage } = await getSettings();

  return (
    <>
      {Array.from({ length: itemsPerPage }, (_, i) => (
        <Card
          key={i}
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <CardContent sx={{ p: 1.5, width: "100%", display: "flex", alignItems: "center" }}>
            <Checkbox sx={{ mr: 1.5 }} disabled />
            <Link href="#" w="100%">
              <Skeleton />
            </Link>
          </CardContent>
          <CardActions sx={{ p: 1.5, gap: 0.75 }}>
            <Button variant="outlined" disabled startIcon={<Edit />} color="primary">
              Edit
            </Button>
            <Button variant="outlined" disabled startIcon={<Delete />} color="error">
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}

export default function Loading() {
  return null;
  return (
    <Box width="100%">
      <Suspense fallback={<h1>Loading items page</h1>}>
        <ItemsHeaderLayout
          paginationProps={{ count: 1, page: 1, disabled: true }}
          searchField={<ItemSearchFieldLayout isLoading value="" search="" />}
        />
      </Suspense>
      <ItemsContainerLayout isLoading rows={[]} />
    </Box>
  );
}

// Select ClientOnly fallback:
//
// <Flex
//   w={320}
//   h="full"
//   border="1px solid {colors.border}"
//   rounded="sm"
//   justify="space-between"
//   px={3}
//   pointerEvents="none"
// >
//   <Skeleton
//     w="50%"
//     h="calc(100% - var(--chakra-spacing-6))"
//     alignSelf="center"
//   />
//   {/*
//     The 1px offset is due to the real chevron using position absolute.
//     So in order to keep the border, this icon needs to pretend that border doesn't exist.
//   */}
//   <Icon color="fg.muted" mr="-1px">
//     <Box
//       as="svg"
//       stroke="currentColor"
//       strokeWidth={2}
//       strokeLinejoin="round"
//       w="1em"
//       // @ts-expect-error Chakra type bug, it works in runtime.
//       viewBox="0 0 24 24"
//     >
//       <path d="m6 9 6 6 6-6" />
//     </Box>
//   </Icon>
// </Flex>
//
