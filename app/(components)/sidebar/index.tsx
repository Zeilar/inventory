"use client";

import { usePathname } from "next/navigation";
import { AppBarNavlink, DesktopNavlink } from "./navlink";
import { APP_BAR_HEIGHT } from "./config";
import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdOutlineHome,
  MdInventory2,
  MdOutlineWarehouse,
  MdSettings,
  MdWarehouse,
  MdOutlineSettings,
  MdPostAdd,
  MdOutlinePostAdd,
} from "react-icons/md";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop. */}
      <Box display={["none", "contents"]}>
        <Box p={4} pr={0} h="100svh">
          <Flex
            h="full"
            flexDir="column"
            gap={1}
            border="1px solid {colors.border}"
            bgColor="bg.panel"
            rounded="sm"
          >
            <Heading
              alignSelf="center"
              as="h3"
              size="2xl"
              display="flex"
              alignItems="center"
              color="teal.fg"
              gap={2}
              px={6}
              my={8}
            >
              <Icon size="xl">
                <MdInventory2 />
              </Icon>
              Inventory
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
                href="/items/create"
                icon={MdPostAdd}
                isActive={pathname === "/items/create"}
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
            href="/items/create"
            icon={pathname === "/items/create" ? MdPostAdd : MdOutlinePostAdd}
            isActive={pathname === "/items/create"}
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
