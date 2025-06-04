import { Box, Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { Form } from "./form";
import { getSettings } from "../api/settings/getSettings";

export default async function Page() {
  return (
    <Box display="flex" flexDirection="column" gap={1.5}>
      <Breadcrumbs hrefs={[{ href: "/", label: "Home" }]} current="Settings" />
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h4">Settings</Typography>
        <Form settings={await getSettings()} />
      </Box>
    </Box>
  );
}
