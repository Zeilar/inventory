import {
  Box,
  SkeletonText as ChakraSkeletonText,
  Flex,
  type SkeletonTextProps,
} from "@chakra-ui/react";

export function SkeletonText({ noOfLines = 1, ...props }: SkeletonTextProps) {
  return (
    <Flex align="center">
      <ChakraSkeletonText noOfLines={noOfLines} {...props} />
      {/* This text is a hack to make the skeleton not affect the container height. */}
      <Box as="span" opacity={0}>
        x
      </Box>
    </Flex>
  );
}
