"use client";

import { usePathname } from "next/navigation";
import { AppBarNavlink, DesktopNavlink } from "./navlink";
import { APP_BAR_HEIGHT } from "./config";
import { Box, Button, Flex, Heading, Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdOutlineHome,
  MdOutlineWarehouse,
  MdSettings,
  MdWarehouse,
  MdOutlineSettings,
  MdPostAdd,
  MdOutlinePostAdd,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";
import { useColorMode } from "@/components";

export function Sidebar() {
  const pathname = usePathname();
  const { setColorMode } = useColorMode();

  return (
    <>
      {/* Desktop. */}
      <Box display={["none", "contents"]}>
        <Box h="100svh">
          <Flex
            h="full"
            flexDir="column"
            gap={1}
            borderRight="1px solid {colors.border}"
            bgColor="bg.panel"
          >
            <Heading
              textTransform="uppercase"
              as="h2"
              size="2xl"
              display="flex"
              alignItems="center"
              color="teal.fg"
              gap={2}
              px={8}
              my={8}
            >
              <Box
                as="span"
                mb="1px"
                letterSpacing="1px"
                bgGradient="linear-gradient(to bottom, {colors.teal.fg}, {colors.teal.solid})"
                bgClip="text"
              >
                Inventory
              </Box>
            </Heading>
            <Flex flexDir="column" p={4} pt={0} gap={1}>
              <DesktopNavlink href="/" icon={MdHome} isActive={pathname === "/"} label="Home" />
              <DesktopNavlink
                href="/items"
                icon={MdWarehouse}
                isActive={pathname === "/items"}
                label="Items"
              />
              <DesktopNavlink
                href="/items/deposit"
                icon={MdPostAdd}
                isActive={pathname === "/items/deposit"}
                label="Deposit"
              />
              <DesktopNavlink
                href="/settings"
                icon={MdSettings}
                isActive={pathname === "/settings"}
                label="Settings"
              />
            </Flex>
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr"
              m={4}
              mt="auto"
              rounded="sm"
              border="1px solid {colors.border}"
            >
              <Button
                variant="plain"
                onClick={() => setColorMode("light")}
                w="full"
                rounded="sm"
                _light={{ bgColor: "yellow.muted" }}
              >
                <Icon color="yellow.fg" size="sm">
                  <MdLightMode />
                </Icon>
                Light
              </Button>
              <Button
                variant="plain"
                onClick={() => setColorMode("dark")}
                w="full"
                rounded="sm"
                _dark={{ bgColor: "bg.muted" }}
              >
                <Icon color="fg" size="sm">
                  <MdDarkMode />
                </Icon>
                Dark
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* Mobile. */}
      <Box display={["contents", "none"]}>
        <Flex
          as="nav"
          borderTop="1px solid {colors.border}"
          bgColor="bg.panel"
          w="full"
          pos="fixed"
          top="auto"
          bottom={0}
          justify="center"
          flexDir="row"
          align="center"
          gap={4}
          zIndex="overlay"
          height={APP_BAR_HEIGHT}
        >
          <AppBarNavlink
            href="/"
            icon={pathname === "/" ? MdHome : MdOutlineHome}
            isActive={pathname === "/"}
          />
          <AppBarNavlink
            href="/items"
            icon={pathname === "/items" ? MdWarehouse : MdOutlineWarehouse}
            isActive={pathname === "/items"}
          />
          <AppBarNavlink
            href="/items/deposit"
            icon={pathname === "/items/deposit" ? MdPostAdd : MdOutlinePostAdd}
            isActive={pathname === "/items/deposit"}
          />
          <AppBarNavlink
            href="/settings"
            icon={pathname === "/settings" ? MdSettings : MdOutlineSettings}
            isActive={pathname === "/settings"}
          />
        </Flex>
      </Box>
    </>
  );
}
