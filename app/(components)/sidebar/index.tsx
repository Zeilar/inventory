"use client";

import { usePathname } from "next/navigation";
import { AppBarNavlink, DesktopNavlink } from "./navlink";
import { APP_BAR_HEIGHT } from "./config";
import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
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
import { InventoryIcon } from "./inventory-icon";

export function Sidebar() {
  const pathname = usePathname();

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
              alignSelf="center"
              as="h2"
              size="2xl"
              display="flex"
              alignItems="center"
              color="teal.fg"
              gap={2}
              px={6}
              my={8}
            >
              <Icon size="xl">
                <InventoryIcon />
              </Icon>
              <Box as="span" mb="1px" letterSpacing="1px">
                Inventory
              </Box>
            </Heading>
            <Flex flexDir="column" p={4} gap={1}>
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
          </Flex>
        </Box>
      </Box>

      {/* Mobile. */}
      <Box display={["contents", "none"]}>
        <Box
          pos="fixed"
          bottom={0}
          top="auto"
          justifyContent="center"
          flexDirection="row"
          gap={3}
          alignItems="center"
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
        </Box>
      </Box>
    </>
  );
}
