import { A11yBar, Heading } from "@/components";
import { Box, Text } from "@chakra-ui/react";

export default function Page() {
  return (
    <>
      <A11yBar />
      <Box m={4}>
        <Heading size="6xl" as="h1" color="fg.warning">
          404
        </Heading>
        <Text>That page does not exist.</Text>
      </Box>
    </>
  );
}
