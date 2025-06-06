import { db } from "@/features/db";
import { settingsTable, type SettingsValues } from "@/features/db/schema";
import { unstable_cache } from "next/cache";

export const settingsTag = "settings";

export const settingsNextConfig: NextFetchRequestConfig = {
  revalidate: 31_556_926, // One year.
  tags: [settingsTag],
};

export const getSettings = unstable_cache(
  async (): Promise<SettingsValues> => {
    const settings = await db.select().from(settingsTable).limit(1);
    if (!settings.length) {
      throw new Error("Settings not found.");
    }
    return settings[0].value;
  },
  [settingsTag],
  settingsNextConfig
);
