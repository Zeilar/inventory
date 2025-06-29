import { Box, SkeletonText } from "@chakra-ui/react";

interface DashboardLayoutSkeletonTextProps {
  w: number;
  noOfLines?: number;
}

export function DashboardLayoutSkeletonText({
  noOfLines = 1,
  w,
}: DashboardLayoutSkeletonTextProps) {
  return (
    <>
      <SkeletonText w={w} noOfLines={noOfLines} my="auto" />
      {/* This text is a hack to make the skeleton not affect the container height. */}
      <Box as="span" opacity={0}>
        x
      </Box>
    </>
  );
}
