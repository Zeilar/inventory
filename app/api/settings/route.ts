import { buildAppUrl } from "@/common";
import { db } from "@/features/db";
import { settingsTable, type SettingsValues } from "@/features/db/schema";
import { settingsValuesValidator } from "@/features/settings";
import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    const settings = db.select().from(settingsTable).get();
    if (!settings) {
      throw new Error("Settings not found.");
    }
    return NextResponse.json(settings.value);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch settings." }, { status: 500 });
  }
}
