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
    // try {
    const settings = (await db.select().from(settingsTable).limit(1)).at(0);
    if (!settings) {
      throw new Error("Settings not found.");
    }
    return settings.value;
    // } catch (error) {
    //   console.error(error);
    //   return { itemsPerPage: 10 };
    // }
  },
  [settingsTag],
  settingsNextConfig
);
