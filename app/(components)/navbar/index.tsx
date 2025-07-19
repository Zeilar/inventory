"use client";

import { usePathname } from "next/navigation";
import { AppBarNavlink, DesktopNavlink } from "./navlink";
import { APP_BAR_HEIGHT } from "./config";
import { Box, Flex, Heading } from "@chakra-ui/react";
import {
  MdHome,
  MdOutlineHome,
  MdOutlineWarehouse,
  MdSettings,
  MdWarehouse,
  MdOutlineSettings,
  MdPostAdd,
  MdOutlinePostAdd,
} from "react-icons/md";

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop. */}
      <Box display={["none", "contents"]}>
        <Flex
          justify="center"
          borderBottom="1px solid {colors.border}"
          pos="sticky"
          top={0}
          w="full"
          zIndex="banner"
          bgColor="bg.panel"
        >
          <Flex px={6} gap={12} justify="center" maxW="breakpoint-2xl">
            {/* <Heading
            textTransform="uppercase"
            as="h2"
            size="2xl"
            display="flex"
            alignItems="center"
            color="bg.fg"
            gap={2}
            px={8}
            my={8}
          >
            <Box
              as="span"
              letterSpacing="1px"
              bgGradient="linear-gradient(to bottom, {colors.bg.fg}, {colors.bg.solid})"
              bgClip="text"
            >
              Inventory
            </Box>
          </Heading> */}
            <DesktopNavlink href="/" isActive={pathname === "/"} label="Home" />
            <DesktopNavlink href="/items" isActive={pathname === "/items"} label="Items" />
            <DesktopNavlink
              href="/items/deposit"
              isActive={pathname === "/items/deposit"}
              label="Deposit"
            />
            <DesktopNavlink href="/settings" isActive={pathname === "/settings"} label="Settings" />
          </Flex>
        </Flex>
      </Box>

      {/* Mobile. */}
      <Box display={["contents", "none"]}>
        <Flex
          as="nav"
          borderTop="1px solid {colors.border}"
          bgColor="bg.panel"
          w="full"
          pos="fixed"
          bottom={0}
          justify="center"
          align="center"
          gap={6}
          zIndex="overlay"
          h={APP_BAR_HEIGHT}
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
