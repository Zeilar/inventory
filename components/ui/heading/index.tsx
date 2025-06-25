import { openSans } from "@/features/theme/fonts";
import { Heading as ChakraHeading, type HeadingProps } from "@chakra-ui/react";

export const Heading = (props: HeadingProps) => {
  return <ChakraHeading fontFamily={openSans.style.fontFamily} {...props} />;
};
