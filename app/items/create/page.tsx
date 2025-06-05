import { Breadcrumbs } from "@/components";
import { CreateItemForm } from "@/features/item/components";
import { Box, Divider, Typography } from "@mui/material";

export default async function Page() {
  return (
    <Box display="flex" flexDirection="column" gap={1.5}>
      <Breadcrumbs
        hrefs={[
          { href: "/", label: "Home" },
          { href: "/items", label: "Items" },
        ]}
        current="Create"
      />
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h4">Create item</Typography>
        <Divider />
        <CreateItemForm />
      </Box>
    </Box>
  );
}
