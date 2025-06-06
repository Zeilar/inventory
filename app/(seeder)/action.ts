"use server";

import { db } from "@/features/db";
import { settingsTable } from "@/features/db/schema";
import { revalidateTag } from "next/cache";
import { settingsTag } from "../api/settings/getSettings";

export async function install() {
  await db.insert(settingsTable).values({});
  revalidateTag(settingsTag);
}
