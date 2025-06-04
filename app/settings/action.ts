"use server";

import { settingsTable, SettingsValues } from "@/features/db/schema";
import { revalidateTag } from "next/cache";
import { db } from "@/features/db";
import { eq } from "drizzle-orm";
import { settingsTag } from "../api/settings/getSettings";

export async function saveSettings(settings: SettingsValues): Promise<void> {
  await db.update(settingsTable).set({ value: settings }).where(eq(settingsTable.id, 1));
  revalidateTag(settingsTag);
}
