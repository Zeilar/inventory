import { buildAppUrl } from "@/common";
import type { SettingsValues } from "@/features/db/schema";
import { settingsValuesValidator } from "@/features/settings";

export const settingsTag = "settings";

export const settingsNextConfig: NextFetchRequestConfig = {
  revalidate: 31_556_926, // One year.
  tags: [settingsTag],
};

export async function getSettings(): Promise<SettingsValues> {
  const settingsRes = await fetch(buildAppUrl("/api/settings"), {
    next: settingsNextConfig,
  });
  return settingsValuesValidator.parse(await settingsRes.json());
}
